# J-learn

A Japanese study app for N5 to N3: hiragana and katakana, vocabulary, grammar and particles, plus the words from my own chats. You can also drop in your own Anki decks.

It runs as:

- an **Android app** (APK),
- a **Linux desktop app** (AppImage, .deb or .rpm),
- a **Windows desktop app** (installer .exe or .msi),
- a **web app** you can install from the browser on any device (GitHub Pages).

All three use the same files in `web/`. The desktop and Android apps wrap them with [Tauri 2](https://tauri.app).

## Getting the apps

Every push to `main` builds Linux, Windows and Android in GitHub Actions and publishes them together as a new release on the **Releases** page, numbered `v1.0.<build number>`. You can also start a build by hand from **Actions → Build and release → Run workflow**.

### Android (Samsung)

1. Download `J-learn_<version>.apk` from the latest release.
2. Open it, and allow your browser or file manager to install unknown apps when asked.

### Linux desktop (CachyOS / Arch)

The AppImage runs on any distro:

```sh
chmod +x J-learn*.AppImage
./J-learn*.AppImage
```

If it doesn't start on Arch-based systems, install FUSE 2: `sudo pacman -S fuse2`. Alternatively, `.deb` and `.rpm` packages are built too.

### Windows

Download and run the `-setup.exe` installer from the latest release (or the `.msi`). It installs Microsoft's WebView2 runtime if it's missing.

### Web app (any device)

1. Turn on Pages once: **Settings → Pages → Source: GitHub Actions**.
2. After the next push, open `https://ari1re.github.io/J-learn/` in Chrome, Brave or Edge.
3. Choose **Install app**. It works offline after the first visit.

## Android signing (do this once)

Without a key, CI signs each build with a throwaway key. Android then refuses to install a new build over the old one, so you'd have to uninstall it first (which erases your progress). To keep updates installing cleanly, create one key and store it in the repo's secrets:

```sh
keytool -genkeypair -v -keystore jlearn.keystore -alias jlearn \
  -keyalg RSA -keysize 2048 -validity 10000
base64 -w0 jlearn.keystore    # copy the output
```

In **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | the base64 output |
| `ANDROID_KEYSTORE_PASSWORD` | the keystore password |
| `ANDROID_KEY_ALIAS` | `jlearn` |

Keep the `.keystore` file somewhere safe and out of the repo (it's in `.gitignore`).

## Developing

```sh
npm install
npx tauri dev                      # desktop window with the app
npx tauri android init             # once, needs Android SDK + NDK
npx tauri android dev              # run on a connected phone
```

To use only the web files, open `web/index.html` through any static server, for example `python -m http.server -d web`.

## Where things live

| Path | What it holds |
| --- | --- |
| `web/index.html` | the whole app interface |
| `web/data/vocab.js` | vocabulary: `[word, meaning, level, topic, other meanings]` |
| `web/data/grammar.js` | grammar patterns |
| `web/data/particles.js` | particles, mix-ups, sentence breakdowns, practice |
| `web/data/kana.js` | kana charts, example words, look-alikes |
| `web/data/mywords.js` | words from my own chats |
| `web/lib/anki-import.js` | reads `.apkg`, `.colpkg` and text exports |
| `src-tauri/` | the desktop and Android app shell |
| `scripts/set-version.mjs` | sets the version number (CI runs it on every build) |

In the data files, `{漢字|かんじ}` puts furigana over kanji, and `[…]` highlights part of an example sentence.

## Notes

- Progress (known words, kana streaks, imported decks) is stored on each device separately: the Android app, the desktop app and the web app each keep their own.
- **Play sound** uses the device's built-in text-to-speech. Browsers and the web app usually have it. The Android app's WebView doesn't support it, so the sound buttons are hidden there.
- Anki import brings in the text of cards, not pictures or audio. Reviews in this app don't sync back to Anki.

## Credits

- Font: Zen Maru Gothic, SIL Open Font License (`web/fonts/LICENSE`).
- Libraries: sql.js (MIT), JSZip (MIT or GPLv3), fzstd (MIT).
