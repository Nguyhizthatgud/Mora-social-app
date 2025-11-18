# MORA Social App

A modern social networking app (Facebook/Threads style) built with React (Vite) and Node.js/Express, using MongoDB, JWT auth, and Zustand state management.

## Overview

- Feed, profile card, trending topics, suggested users
- Authenticate + Authorization: register, login, refresh (httpOnly cookie), logout, get current user, axios interceptor
- Clean UI with Tailwind CSS + Lucide icons
- Robust token flow: shortlived access token + refresh cookie

## Tech Stack

- Frontend: React 18, Vite, React Router, Zustand, Tailwind, Lucide
- Backend: Node.js, Express 5, Mongoose, jsonwebtoken, bcryptjs, cookie-parser
- DB: MongoDB (Atlas)

## Monorepo Structure

`social-spa/
  mora-community/                # Frontend (Vite React)
    src/
      features/landing/          # Landing page UI
      components/ui/spinner.jsx  # Spinner
      services/                  # axios + auth service
      stores/                    # Zustand stores
      shared/Layout/             # Layout + ProtectedRoute
  mora-community-backend/        # Backend (Express)
    src/
      controllers/               # authController
      middleware/                # protectedRoute (JWT)
      routes/authRoutes.js       # /api/auth endpoints
      models/                    # User, Session
      server.js                  # App entry`

## Quick Start (Windows cmd)

- Prereq: Node 18+, MongoDB Atlas URI, Git

Frontend
`cmd
cd mora-community
npm install
npm run dev
`
Backend
`cmd
cd mora-community-backend
npm install
node src/server.js
`

- Frontend dev URL: http://localhost:5173
- Backend API URL: http://localhost:5001/api

## Environment Variables

Backend: mora-community-backend/.env
`dotenv
PORT=5001
MONGODB_URI=YOUR_MONGODB_ATLAS_URI
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-with-a-strong-random-secret
NODE_ENV=development

# Optional expirations

# ACCESS_TOKEN_EXPIRES_IN=35m

# REFRESH_TOKEN_TTL_MS=1209600000

`
Notes

- Do NOT store a fixed ACCESS_TOKEN in .env. Access tokens are generated per user.
- Ensure .env is gitignored.

## Authentication Flow

- Login returns accessToken (JWT, shortlived) and sets
  refreshToken as httpOnly cookie
- On page reload, frontend calls /api/auth/refresh to get a fresh accessToken
- Axios interceptor attaches Authorization: Bearer <accessToken> to requests

Key files

- Frontend store: src/stores/useAuthStore.js
- Frontend services: src/services/authService.js, src/services/axios.js
- Backend controller: src/controllers/authController.js
- Backend middleware: src/middleware/auth.js

## API Endpoints

Base URL: http://localhost:5001/api

- POST /auth/register Create user
- POST /auth/login { accessToken, user info } +
  efreshToken cookie
- POST /auth/refresh { accessToken } (uses httpOnly cookie)
- POST /auth/logout clears
  efreshToken cookie and session
- GET /auth/me current user (requires Authorization: Bearer <accessToken>)

## Frontend Routing

- ProtectedRoute.jsx guards private routes
- On first render: if no ccessToken, calls
  efresh(); then etchMe()
- Spinner is centered during loading

## State & Networking

- Zustand store: useAuthStore
  - signIn: saves data.accessToken, then etchMe()
  - efresh: calls uthService.refresh(); if token received, set and etchMe() as needed
  - etchMe: GET /api/auth/me with Authorization header
- Axios interceptor: reads ccessToken from store and sets header automatically

## Build & Deploy

Frontend

- Vercel: auto-detects Vite
  `cmd
cd mora-community
npm run build
vercel
`
- Netlify:
  `cmd
cd mora-community
npm run build
netlify deploy --prod --dir=dist
`
  Backend
- Render/Railway/Heroku: set env vars, start command
  ode src/server.js
- Allow CORS with credentials and set exact CLIENT_URL

## Troubleshooting

- ERR_CONNECTION_REFUSED: Ensure backend is running on 5001
- JsonWebTokenError: jwt malformed: Confirm Authorization: Bearer <accessToken> uses a real JWT string, not state object
- TypeError: Cannot read properties of undefined (reading 'accessToken') at refresh:
  - Ensure uthService.refresh() uses wait and returns
    es?.data?.accessToken ?? null
- 401 on /auth/me after refresh:
  - Check axios interceptor uses useAuthStore.getState().accessToken
  - Verify refresh endpoint returns { accessToken } and JWT_SECRET matches login
- proxy.js disconnected port: Browser extension noise (e.g., React DevTools). Use incognito or disable extensions

## Scripts

Frontend (mora-community/package.json)

- dev: Vite dev server
- uild: build to dist
- preview: serve production build locally

Backend (mora-community-backend/package.json)

- start:
  ode src/server.js
- dev:
  odemon src/server.js

## Security

- Rotate JWT_SECRET if exposed
- Keep
  efreshToken httpOnly; never expose in JS
- Set secure: true and strict sameSite in production

## Roadmap

- Real post CRUD + likes/comments APIs
- Follow system & timelines (For You / Following)
- Media uploads (S3/GCS)
- Notifications

Made with for the MORA Community
