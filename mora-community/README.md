# MORA Community

A modern social app inspired by Facebook and Threads, built with React (Vite) and Node.js (Express).

## Features

- Responsive landing page with feed, user profile, trending topics, and suggested users
- Authentication (sign up, sign in, sign out)
- Interactive post actions (like, comment, share, bookmark)
- Modular component structure
- Modern UI with Tailwind CSS and Lucide icons

## Project Structure

```
mora-community/           # Frontend (React + Vite)
  src/
    features/landing/     # Landing page UI
    components/ui/        # Reusable UI components (Spinner, etc.)
    services/             # API services
    stores/               # Zustand stores
    shared/Layout/        # Layout components
mora-community-backend/   # Backend (Node.js + Express)
  src/
    controllers/          # Route controllers
    middleware/           # Auth middleware
    models/               # Mongoose models
    routes/               # Express routes
```

## Getting Started

### Frontend

```bash
cd mora-community
npm install
npm run dev
```

### Backend

```bash
cd mora-community-backend
npm install
npm start
```

## Deployment

### Frontend

- Vercel: `vercel`
- Netlify: `netlify deploy --prod`
- GitHub Pages: `npm run deploy`

### Backend

- Railway, Render, or Heroku (see instructions above)

### Database

- MongoDB Atlas (recommended)

## Environment Variables

- Store secrets in `.env` files (never commit to git)
- Set variables on your hosting platform

## License

MIT

---

**Made by Nguyhizthatgud @2025**

## Requirements

### Authentication Features

- [x] User have to login to access the community features.
- [x] New User for new account with name, email, password fields.
- [x] User stay logged in with refreshing page.

### User Profile

- [x] Leftside of the homepage, user see them profile info including scorecards of number of friends and posts.
- [ ] On the profile cover, user can switch tabs, between "profile", "Friends requests", and "Add friends".
- [ ] user can update profile info.

### posts and comments

- [ ] User can create posts with text and image. the image is optional and user can see the post after creating it.
- [ ] after logged in, user can see a homepage with they posts and them friends posts. New posts appear on the top. User can click to see more posts. If there is no more posts, load more button is disabled.
- [ ] User can like and comment on posts. The number of likes and comments are shown on each post. User can see the comments on a post by clicking on the comments button. User
