# Vini

A tiny Chrome extension: press a hotkey, talk, press it again, and your words land on the clipboard.
It borrows ChatGPT's own dictation on chatgpt.com, so there is nothing to install besides the extension.

## Install

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and pick the `extension/` folder.
3. Open `chrome://extensions/shortcuts`, set a shortcut for **Vini** (default `Alt+Shift+D`), and set its scope to **Global** so it also works while another app is in front.
4. Keep a chatgpt.com tab open and logged in (Vini opens one in the background if none exists).

## Use

1. Press the shortcut and talk. The toolbar icon shows a red **REC**.
2. Press it again to stop. The icon shows **...** while ChatGPT transcribes, then a green **✓**.
3. Press `Cmd+V` wherever you want the text.

| Badge | Meaning |
|---|---|
| REC (red) | recording |
| ... (orange) | transcribing |
| ✓ (green) | copied to the clipboard |
| ? (grey) | the mic button was not found on chatgpt.com (logged out? UI changed?) |
| ! (grey) | transcript did not arrive within about 3 minutes |
| ! (red) | an error, see the service worker console in `chrome://extensions` |

## Limits

- Needs a logged-in chatgpt.com session in the same Chrome profile.
- It clicks ChatGPT's own buttons by their labels, so a ChatGPT UI change can break it.
- A browser extension cannot type into other apps, so pasting is left to you.

See [doc.md](doc.md) for how it works.
