# Vercel Deployment Setup

## Fix for 404 Errors

The 404 errors occur because Vercel doesn't know where your frontend build output is located.

## Step 1: Configure Vercel Project Settings

In your Vercel dashboard:

1. Go to **Project Settings** → **General**
2. Set **Root Directory**: `frontend`
3. Go to **Build & Development Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Step 2: Environment Variables

Add these in Vercel dashboard → **Settings** → **Environment Variables**:

- `VITE_API_URL` = Your backend API URL (e.g., `https://your-backend.railway.app/api`)

If you haven't deployed the backend yet, leave this empty and the frontend will use relative `/api` paths.

## Step 3: Backend Deployment (Required)

Your backend needs to be deployed separately. Recommended services:

### Option A: Railway (Easiest)
1. Go to https://railway.app
2. Create account → New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `backend`
5. Add environment variables:
   - `N8N_WEBHOOK_URL` = your n8n webhook URL
6. Railway will auto-detect Node.js and deploy
7. Copy the generated URL (e.g., `https://your-app.railway.app`)
8. Set `VITE_API_URL` in Vercel to `https://your-app.railway.app/api`

### Option B: Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as Railway)
6. Deploy and copy URL

## Step 4: Redeploy on Vercel

After configuring:
1. Push changes to GitHub
2. Vercel will auto-deploy
3. Or manually trigger deployment in Vercel dashboard

## Alternative: Deploy Frontend Only (For Testing)

If you just want to test the frontend UI without backend:

1. In Vercel, set Root Directory to `frontend`
2. Leave `VITE_API_URL` empty
3. Frontend will try to connect to `/api` (which won't work, but you'll see the UI)

## Troubleshooting

### Still getting 404s?
- Check Root Directory is set to `frontend`
- Verify `outputDirectory` in `vercel.json` matches `dist` folder
- Check build logs in Vercel to see if build succeeded

### Build failing?
- Make sure all dependencies are in `package.json`
- Check that `npm run build` works locally first
- Review build logs in Vercel dashboard

### API calls not working?
- Verify backend is deployed and accessible
- Check `VITE_API_URL` environment variable is set correctly
- Test backend URL directly in browser: `https://your-backend.railway.app/health`

