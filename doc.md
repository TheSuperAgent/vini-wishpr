# How Vini works

Vini is a Manifest V3 Chrome extension in `extension/`. It has no server and no speech model of its own.
It drives the dictation feature on chatgpt.com and copies the result to the clipboard.

## Files

| File | Role |
|---|---|
| `manifest.json` | Declares the permissions, the `toggle-dictation` hotkey, and the icons. |
| `background.js` | Service worker. Handles the hotkey and runs the whole flow. |
| `offscreen.html`, `offscreen.js` | Hidden page that does the clipboard write (a service worker has no clipboard). |
| `icons/` | Toolbar and store icons (16, 32, 48, 128 px). `icon.png` in the repo root is the master image. |

## Permissions

- `scripting` + host access to `https://chatgpt.com/*`: to click buttons and read the text box in the ChatGPT tab.
- `offscreen`: to create the hidden clipboard page.
- `clipboardWrite`: required for `document.execCommand('copy')` there.

## The flow

Each press of the hotkey runs `onToggle` in `background.js`:

1. **Find the tab.** Use an existing `chatgpt.com` tab, or open one in the background and wait for it to load.
2. **Toggle.** Inject a small function into the tab that looks for a button by its `aria-label`:
   - "Stop dictation" present: click it and report `stopped`.
   - else "Dictate" present: click it and report `started` (badge **REC**, done).
   - else report `nobutton` (retried for up to 10 seconds in case the page is still rendering).
3. **Wait for the transcript** (after `stopped`, badge **...**). Poll the ChatGPT text box every 500 ms. When the text is non-empty and unchanged across two polls, transcription is finished. Gives up after about 3 minutes.
4. **Copy, then clear.** Send the text to the offscreen page, which puts it on the clipboard, and only then clear ChatGPT's text box so a failed copy never loses the text. Badge **✓**.

Errors in any step are caught and shown as a red **!** badge.

## Design notes

- The start/stop is a toggle on purpose. Recording length is whatever you choose, and ChatGPT's transcription time depends on speech length and connection, so the wait is open-ended rather than a fixed delay.
- Buttons are found by label (`Dictate`, `Stop dictation`), not by CSS class, because ChatGPT's class names are generated and change.
- The text box is found with `#prompt-textarea, form [contenteditable="true"], form textarea`, covering both ChatGPT layouts seen.
- The manifest contains a public `key` so the extension keeps the same ID on every machine.

## Troubleshooting

- **Nothing happens:** check the shortcut at `chrome://extensions/shortcuts` and that its scope is **Global** when another app is in front.
- **Grey `?`:** open chatgpt.com in that profile and make sure you are logged in and the mic icon is visible.
- **Red `!`:** click **service worker** under Vini in `chrome://extensions` to see the error.
- **Not copying:** reload the extension so the `clipboardWrite` permission takes effect.
