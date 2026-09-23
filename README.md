# NekoStream

NekoStream is a Vite/React anime catalogue with a separate Express + MongoDB API for account registration and login.

## What is included

- Registration, login, persisted session restoration, and logout.
- Passwords are hashed with bcrypt; passwords never leave the API as a response.
- Short-lived access and revocable refresh session cookies are `HttpOnly` and `Secure` in production.
- Input validation, restricted CORS origins, Helmet headers, JSON size limit, auth rate limiting, and a health endpoint.
- The frontend calls `/api` by default; Vite proxies it to the local API during development.

## Run locally

Requirements: Node.js 20+ and a running MongoDB instance (local or Atlas).

1. Configure the API:

   ```powershell
   Copy-Item server/.env.example server/.env
   ```

   Set `MONGODB_URI`, `JWT_ACCESS_SECRET`, and `JWT_REFRESH_SECRET` in `server/.env`. Generate two different, random secrets of at least 32 characters. Do not commit this file.

2. Install dependencies and run the API in one terminal:

   ```powershell
   cd server
   npm install
   npm run dev
   ```

3. Run the client in a second terminal from the repository root:

   ```powershell
   npm install
   npm run dev
   ```

Open the Vite URL (normally `http://localhost:5173`). The API health check is at `http://localhost:5000/api/health`.

## Production configuration

Deploy the frontend and API behind HTTPS. Set `NODE_ENV=production`, configure `CLIENT_ORIGIN` to the exact frontend URL (multiple origins can be comma-separated), and use a managed MongoDB connection string with TLS and credentials. Keep the API and client on the same site (for example `app.example.com` and `api.example.com`) so the protected session cookies work without weakening their `SameSite` policy.

If the frontend reaches a separately hosted API rather than a reverse proxy, build it with `VITE_API_BASE_URL=https://api.example.com/api`. Never put server secrets in a `VITE_*` variable.

The API is in [`server`](server) and can be started in production with `npm run server:start` from the project root after its dependencies are installed.

## Deploy API separately on Vercel

1. Create a new repository containing the contents of [`server`](server), then import that repository into Vercel. The `api/[...path].js` serverless entry point is already included.
2. Use MongoDB Atlas for `MONGODB_URI`; a Docker or local MongoDB address is not reachable from Vercel.
3. Add these Environment Variables in the Vercel API project: `MONGODB_URI`, `CLIENT_ORIGIN`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL`, and `BCRYPT_ROUNDS`. Set `NODE_ENV` to `production`.
4. In this frontend repository, add `VITE_API_BASE_URL=https://YOUR-API.vercel.app/api` to the Vercel frontend Environment Variables, then redeploy the frontend.

For cookie-based sessions, use custom subdomains of the same domain, such as `app.example.com` and `api.example.com`; set `CLIENT_ORIGIN=https://app.example.com`. Two unrelated `*.vercel.app` URLs are cross-site and browsers may block their session cookies. Keep the current `SameSite=Lax` cookie setting rather than weakening session security.
