# vini-wishpr 🎙️

**Voice-to-text on a hotkey, powered by the ChatGPT tab you already have open.**

*vini-wishpr is the project name. "Vini" is the extension you will see in Chrome.*

Press a shortcut, talk, press it again, and your words are on the clipboard, ready to paste into any app.
No API key, no speech model to download, no server: Vini borrows ChatGPT's own dictation, in about 100 lines of plain JavaScript.

## Why Vini

You already pay for, or log in to, a world-class speech-to-text system: ChatGPT. Vini turns it into a system-wide dictation key instead of building another one.

- **Zero setup cost.** No keys, billing, model downloads or accounts beyond the ChatGPT login you already have.
- **Nothing to trust.** Under 100 lines, no dependencies, no build step, no network calls of its own. Read the whole thing in five minutes.
- **Works in every app.** The result is on the clipboard, so `Cmd+V` works in your editor, chat, email or terminal.
- **Fits in your flow.** One global shortcut to start, the same one to stop. No window to switch to.

### How it compares

| | Vini | OS built-in dictation | Whisper-style apps | Paid dictation tools |
|---|---|---|---|---|
| Setup | Load one folder | None | Install app and model, or add an API key | Install app, subscribe |
| Ongoing cost | Your existing ChatGPT plan | Free | Free (local) or per-use (API) | Subscription |
| Code you must trust | ~100 readable lines | OS vendor | A full app | A closed app |
| Types into other apps for you | No, you paste | Yes | Often | Yes |

Vini trades automatic typing for simplicity and transparency. If you want text injected straight into any field, use a native tool. If you want a tiny, auditable hotkey that reuses what you already have, this is it.

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

## Privacy and disclaimer

- Vini has no server, no analytics and makes no network requests of its own. Your audio is recorded and transcribed by ChatGPT, under your own ChatGPT account and OpenAI's terms.
- The transcript is placed on the system clipboard, so clipboard-history tools can see it.
- Vini is purely a hobby project, built to make the most of what ChatGPT can do. We respect OpenAI's technology and terms, and it is not affiliated with or endorsed by OpenAI.
- This is my personal hobby project. It is not associated with, sponsored by, or connected to any company I work for or have worked for.
- After copying, Vini clears the ChatGPT message box, including any draft you had typed there.

## Support

Questions, bugs or ideas? [Open an issue](https://github.com/TheSuperAgent/vini-wishpr/issues) in this repo.

## License

[MIT](LICENSE)

See [doc.md](doc.md) for how it works.
