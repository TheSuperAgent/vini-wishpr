# Changelog

## 1.0 - 2026-11-10

First public release.

### Added
- Global hotkey (default `Alt+Shift+D`) that starts and stops dictation using ChatGPT's own dictation on chatgpt.com.
- Transcript copied to the clipboard once transcription finishes, then the ChatGPT message box is cleared (only after the copy succeeds).
- Opens a background chatgpt.com tab automatically if none is open.
- Toolbar badge for status: REC, transcribing, copied, button not found, timeout, error.
- Buttons are found by label, not CSS class, so the extension survives ChatGPT's generated class names.
- MIT license.

### Notes
- No server, no API key, no analytics, and no network requests of its own.
- Permissions are limited to `scripting`, `offscreen`, `clipboardWrite` and `https://chatgpt.com/*`.
