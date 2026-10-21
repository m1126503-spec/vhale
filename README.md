# TON DEX Mini App

Safe Telegram Mini App for TON swaps and liquidity. This app keeps all secret values on the server side and never exposes Telegram Bot token or other sensitive credentials to the browser.

## Security rules

- Do not add `VITE_BOT_TOKEN` anywhere in frontend files.
- Keep `BOT_TOKEN` only in server-side environment variables (for example Vercel/Netlify/Lambda).
- Use the browser only for public values such as `VITE_TELEGRAM_BOT_USERNAME`, app URL, app name, and TON API public endpoints.

## Local development

1. Copy `.env.example` to `.env`.
2. Set the public values for your app.
3. Run:

```bash
npm install
npm run dev
```

## Production deployment

### Vercel

1. Import the repo to Vercel.
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables on the hosting side, for example:
   - `BOT_TOKEN=...`  (server-side secret, never in client bundle)
   - `VITE_APP_NAME=TON DEX Mini App`
   - `VITE_APP_URL=https://your-domain.vercel.app`
   - `VITE_APP_ICON=https://your-domain.vercel.app/icon.svg`
   - `VITE_TELEGRAM_BOT_USERNAME=@your_bot_username`
   - `VITE_TONAPI_BASE_URL=https://tonapi.io`
   - `VITE_TONAPI_KEY=...` (if needed)

### Telegram Mini App

- Publish the app behind HTTPS.
- Ensure `/manifest.webmanifest` and `/tonconnect-manifest.json` are reachable.
- Use the Telegram Bot username only for public references.

## Notes

- The app uses Telegram WebApp theme variables (`--tg-theme-*`) for mobile-first UI adaptation.
- TON Connect is enabled via `public/tonconnect-manifest.json`.
- Swap routing is modeled with constant-product AMM simulation for TON / Jetton pairs.
