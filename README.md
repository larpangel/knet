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
