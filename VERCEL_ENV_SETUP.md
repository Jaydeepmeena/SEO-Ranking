# Setting Environment Variables in Vercel

## Problem
Your frontend is trying to connect to `localhost:5000` because the `VITE_API_URL` environment variable is not set in Vercel.

## Solution: Add Environment Variable

### Step 1: Get Your Render Backend URL

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your backend service
3. Copy the service URL (e.g., `https://seo-ranking-backend.onrender.com`)
4. Add `/api` to it: `https://seo-ranking-backend.onrender.com/api`

### Step 2: Add to Vercel

1. Go to your Vercel dashboard: https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api` (replace with your actual Render URL)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

### Step 3: Redeploy

After adding the environment variable:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Verify It's Working

After redeployment:
1. Open your Vercel site
2. Open browser DevTools (F12) → Console tab
3. You should see API calls going to your Render backend URL, not localhost
4. Try uploading a file - it should work!

## Important Notes

- **CORS**: Make sure your Render backend has CORS enabled for your Vercel domain
- **Environment Variables**: Vite requires the `VITE_` prefix for environment variables to be exposed to the frontend
- **Case Sensitive**: Environment variable names are case-sensitive

## If Still Not Working

### Check Render Backend CORS Settings

In your backend `server.js`, make sure CORS is configured:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  credentials: true
}));
```

Or allow all origins (for development):
```javascript
app.use(cors()); // This allows all origins
```

### Check Backend is Running

1. Visit your Render backend URL directly: `https://your-backend.onrender.com/health`
2. You should see: `{"status":"OK","message":"Server is running"}`
3. If not, check Render logs for errors

### Check Environment Variable is Set

After redeploying, you can verify the env var is available by:
1. Adding a temporary console log in your code
2. Or check Vercel deployment logs to see if the variable was injected

## Quick Test

Open browser console on your Vercel site and run:
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

This should show your Render backend URL if the environment variable is set correctly.

