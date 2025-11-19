# MORA Backend Deployment Guide

## Deploy to Render (Recommended)

### Quick Deploy

1. Push code to GitHub
2. Go to: https://render.com/
3. Sign in with GitHub
4. Click **"New +"** → **"Web Service"**
5. Connect **Mora-social-app** repository
6. Configure:
   - **Name**: mora-backend
   - **Region**: Oregon (or closest to you)
   - **Branch**: main
   - **Root Directory**: `mora-community-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
   - **Plan**: Free

### Environment Variables (Add in Render dashboard)

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=https://m0ra.netlify.app
JWT_SECRET=generate_a_strong_random_secret_here
ACCESS_TOKEN_EXPIRES_IN=35m
```

7. Click **"Create Web Service"**
8. Wait 3-5 minutes for deployment
9. Copy your backend URL: `https://mora-backend.onrender.com`

### Update Frontend to Use Deployed Backend

After backend is live, update `mora-community/src/services/axios.js`:

```javascript
const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://mora-backend.onrender.com/api",
  withCredentials: true
});
```

## Alternative: Railway

1. Go to: https://railway.app/
2. Click **"Start a New Project"** → **"Deploy from GitHub repo"**
3. Select **Mora-social-app**
4. Add variables (same as above)
5. Railway auto-detects Node.js and deploys

## Alternative: Heroku

```cmd
cd mora-community-backend
heroku login
heroku create mora-backend
heroku config:set MONGODB_URI=your_uri
heroku config:set CLIENT_URL=https://m0ra.netlify.app
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

## Important: Update CORS

After deployment, ensure `CLIENT_URL` env var matches your Netlify URL exactly (including https://).

## Test Backend

Once deployed, test:

```
https://your-backend-url.onrender.com/api/auth/register
```
