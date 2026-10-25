// Press once: start dictating on chatgpt.com. Press again: stop, copy the transcript to the clipboard, clear the box.

const badge = (text, color = '#d33') => {
  chrome.action.setBadgeBackgroundColor({ color });
  chrome.action.setBadgeText({ text });
};

const COMPOSER = '#prompt-textarea, form [contenteditable="true"], form textarea';

// Runs inside the chatgpt.com tab.
const toggle = () => {
  const by = (re) => [...document.querySelectorAll('button')].find((b) => re.test(b.getAttribute('aria-label') || ''));
  const stop = by(/stop dictation/i);
  if (stop) { stop.click(); return 'stopped'; }
  const start = by(/^dictate/i);
  if (start) { start.click(); return 'started'; }
  return 'nobutton';
};

// Runs inside the chatgpt.com tab: returns the composer text without touching it.
const peekText = (sel) => {
  const e = document.querySelector(sel);
  return e ? (e.value || e.innerText || '').trim() : '';
};

// Runs inside the chatgpt.com tab: clears the composer.
const clearText = (sel) => {
  const e = document.querySelector(sel);
  if (e) { e.focus(); document.execCommand('selectAll'); document.execCommand('delete'); }
};

const run = async (tabId, func, ...args) => {
  const [res] = await chrome.scripting.executeScript({ target: { tabId }, func, args });
  return res && res.result;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function chatgptTab() {
  const [tab] = await chrome.tabs.query({ url: 'https://chatgpt.com/*' });
  if (tab) return tab;
  const created = await chrome.tabs.create({ url: 'https://chatgpt.com/', active: false });
  for (let i = 0; i < 40; i++) { // wait for the page to finish loading
    if ((await chrome.tabs.get(created.id)).status === 'complete') break;
    await sleep(500);
  }
  return created;
}

async function copy(text) {
  if (!(await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] })).length)
    await chrome.offscreen.createDocument({ url: 'offscreen.html', reasons: ['CLIPBOARD'], justification: 'copy transcript' });
  chrome.runtime.sendMessage({ type: 'copy', text });
}

async function onToggle() {
  const tab = await chatgptTab();
  let state = await run(tab.id, toggle);
  for (let i = 0; state === 'nobutton' && i < 10; i++) { // composer may still be rendering
    await sleep(1000);
    state = await run(tab.id, toggle);
  }
  if (state === 'started') return badge('REC');
  if (state !== 'stopped') return badge('?', '#888');

  badge('...', '#e90'); // transcribing; long speech / slow network can take a while
  let last = '';
  for (let i = 0; i < 360; i++) { // ~3 min cap
    await sleep(500);
    const text = await run(tab.id, peekText, COMPOSER);
    if (text && text === last) { // unchanged across two polls = finished
      await copy(text);
      await run(tab.id, clearText, COMPOSER); // clear only after the copy went out
      badge('✓', '#2a2');
      return setTimeout(() => badge(''), 3000);
    }
    last = text;
  }
  badge('!', '#888');
}

chrome.commands.onCommand.addListener(async (cmd) => {
  if (cmd !== 'toggle-dictation') return;
  try {
    await onToggle();
  } catch (err) {
    console.error('toggle-dictation failed', err);
    badge('!', '#d33');
  }
});
