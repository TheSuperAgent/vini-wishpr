// The service worker has no clipboard; this hidden page copies on its behalf.
chrome.runtime.onMessage.addListener((m) => {
  if (m.type !== 'copy') return;
  const t = document.createElement('textarea');
  t.value = m.text;
  document.body.append(t);
  t.select();
  document.execCommand('copy');
  t.remove();
});
