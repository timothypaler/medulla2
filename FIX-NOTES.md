# Direct-open HTML

Root index.html contains a compiled classic JavaScript runtime and embedded CSS. It does not load TSX files or ES modules. Extract the ZIP, then keep index.html, the anatomy/ folder and body-selector-v3.webp together. The detailed artwork is stored as adjacent assets so every individual file stays below the Cloudflare Pages 25 MiB limit.

The managed browser blocks file:// navigation, so direct-file execution cannot be browser-tested here. Script syntax, relative asset references and file presence are checked automatically; the app is tested over HTTP. A phone’s Files preview may not run JavaScript; use the hosted URL in Safari.
