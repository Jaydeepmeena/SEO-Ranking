# Vercel Deployment Guide

## Current Setup

This project has a frontend (React + Vite) and a backend (Express.js). For Vercel deployment, you have two options:

## Option 1: Frontend Only on Vercel (Recommended for now)

Deploy only the frontend on Vercel, and run the backend on a separate service (Railway, Render, Heroku, etc.).

### Steps:

1. **Deploy Backend Separately** (choose one):
   - **Railway**: https://railway.app
   - **Render**: https://render.com
   - **Fly.io**: https://fly.io
   - **Any Node.js hosting service**

2. **Set Environment Variables in Vercel**:
   - Go to your Vercel project settings
   - Add environment variable: `VITE_API_URL` = your backend URL (e.g., `https://your-backend.railway.app/api`)

3. **Deploy Frontend**:
   - Push to GitHub
   - Connect repository to Vercel
   - Vercel will auto-detect and deploy

### Backend Deployment (Example with Railway):

1. Create account on Railway
2. Create new project from GitHub repo
3. Select the `backend` folder as root directory
4. Add environment variables:
   - `PORT` = (auto-set by Railway)
   - `N8N_WEBHOOK_URL` = your n8n webhook URL
5. Deploy

## Option 2: Full-Stack on Vercel (More Complex)

If you want everything on Vercel, you'll need to convert Express routes to Vercel serverless functions.

### Current Issues:
- Express server routes need to be converted to `/api` serverless functions
- File uploads/storage need cloud storage (not local filesystem)
- This requires significant refactoring

## Quick Fix for Current Error

The 404 errors you're seeing are because:
1. Vercel doesn't know where to find your frontend build
2. No API routes are configured

### Immediate Fix:

1. **Update `vercel.json`** (already done):
   - Points build to `frontend/dist`
   - Configures rewrites for SPA routing

2. **Set Build Settings in Vercel Dashboard**:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variable**:
   - `VITE_API_URL` = your backend API URL

## Recommended Architecture

```
Frontend (Vercel) → API calls → Backend (Railway/Render)
                                  ↓
                              n8n Webhook
```

This separation provides:
- Better scalability
- Easier deployment
- Independent scaling of frontend/backend
- Cloud storage for files

