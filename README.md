# kangel.net

A minimal personal link page for @larpangel, hosted on Cloudflare Workers.

## Deploy with Cloudflare Workers Builds

- Connect GitHub repository `larpangel/knet` (branch `main`).
- **Build command:** `echo "Static website — no build needed"`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** `/`

Cloudflare will serve `public/index.html` using the `assets.directory` setting in `wrangler.jsonc`. There are no packages to install or secrets to configure.

For the custom domain, go to the Worker → **Settings → Domains & Routes → Add → Custom Domain** and select `kangel.net` (the domain must be active in the same Cloudflare account).

Edit `public/index.html` to adjust links, colors, text or content.

## Links
- YouTube: https://www.youtube.com/@larpangel
- Twitch: https://www.twitch.tv/kavaiiangel
- X: https://x.com/kavaiiangel
- Discord: https://discord.gg/pchan


## Chat moderator and attachment setup

The new JINE chat lives at `/chat/`; chat-only moderator login lives at `/chat/admin/`.

**Required setup before deployment:**

1. In Cloudflare, create a private R2 bucket named `knet-chat-files` (R2 may require billing setup). The binding is defined in `wrangler.jsonc`.
2. Configure Worker secret `ADMIN_PASSWORD` with the private moderator passcode. Do not commit the password to GitHub.
3. Configure Worker secret `IP_HASH_KEY` with a unique cryptographically random string of at least 32 bytes (e.g. `openssl rand -hex 32`). Keep it stable: changing it invalidates existing network-fingerprint bans.
4. Deploy with `npx wrangler deploy`. Ensure the Cloudflare Git integration's build/deploy settings are correct.

Set secrets from the Wrangler CLI using `npx wrangler secret put ADMIN_PASSWORD` and `npx wrangler secret put IP_HASH_KEY`, or through your Worker's Cloudflare dashboard Settings → Variables and Secrets.

Chat messages and visit counters are stored in a SQLite-backed Durable Object. Files are privately stored in R2; only logged-in chat users may download them. Accepted uploads: PNG, JPEG, GIF, WebP, TXT, PDF up to 5MB, with one upload per network fingerprint per rolling hour. A network ban blocks chat access but is not an account-wide or Cloudflare-level block.

The chat's ordinary entrance passphrase is intended for game fans, not as a strong security boundary. Chat messaging uses sessions and rate limits, but does not provide comprehensive spam, illegal content or malware scanning; moderate file uploads and messages accordingly.

YouTube/Twitch/X counter API integration requires their respective environment secrets; missing counts are marked unavailable, never fabricated.
