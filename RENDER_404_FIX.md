# Fixing 404 Errors on Render

## Problem
Getting 404 errors when accessing the Render backend.

## Common Causes

### 1. Service is Still Waking Up
Render free tier services spin down after 15 minutes of inactivity. When you visit the service:
- It needs 30-60 seconds to wake up
- During this time, you might get 404 or connection errors
- Wait for the "WELCOME TO RENDER" message, then try again

### 2. Wrong URL Path
Make sure you're accessing the correct endpoints:
- ✅ `https://seoranking.onrender.com/health`
- ✅ `https://seoranking.onrender.com/api/jobs/status`
- ❌ `https://seoranking.onrender.com/jobs/status` (missing `/api`)

### 3. Service Not Fully Deployed
Check Render dashboard:
- Is the service status "Live"?
- Are there any build/deployment errors?
- Check the logs for startup errors

## Solutions Applied

I've added:
1. **Root route handler** (`/`) - Shows available endpoints
2. **404 error handler** - Better error messages showing available routes
3. **Better logging** - Shows all routes on server start

## Testing Steps

### Step 1: Check Root Route
Visit: `https://seoranking.onrender.com/`
Should see:
```json
{
  "status": "OK",
  "message": "SEO Ranking API Server",
  "endpoints": {
    "health": "/health",
    "jobs": "/api/jobs",
    "n8n": "/api/n8n"
  }
}
```

### Step 2: Check Health
Visit: `https://seoranking.onrender.com/health`
Should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Step 3: Test API Routes
Try accessing from frontend or Postman:
- `GET https://seoranking.onrender.com/api/jobs/status`
- Should return list of jobs (or empty array)

## If Still Getting 404

### Check Render Logs
1. Go to Render Dashboard
2. Click on your service
3. Go to **Logs** tab
4. Look for:
   - "Server is running on port..."
   - Any error messages
   - Route registration messages

### Verify Service Configuration
In Render dashboard:
1. **Settings** → **Environment**
2. Check that `PORT` is not set (Render auto-sets this)
3. Verify `N8N_WEBHOOK_URL` is set if needed

### Verify Build Configuration
1. **Settings** → **Build & Deploy**
2. **Root Directory**: Should be `backend` (or empty if repo root)
3. **Build Command**: Should be empty (or `npm install`)
4. **Start Command**: Should be `npm start` or `node server.js`

## Quick Test Commands

### Using curl:
```bash
# Test root
curl https://seoranking.onrender.com/

# Test health
curl https://seoranking.onrender.com/health

# Test jobs endpoint
curl https://seoranking.onrender.com/api/jobs/status
```

### Using browser:
Just visit the URLs directly - they should return JSON responses.

## After Deploying Fix

1. Push the updated `server.js` to GitHub
2. Render will auto-deploy
3. Wait for service to be "Live"
4. Test the routes again

