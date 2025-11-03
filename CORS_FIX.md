# CORS Fix for Render Backend

## Problem
Your backend on Render is blocking requests from your Vercel frontend due to CORS (Cross-Origin Resource Sharing) policy.

## Error Message
```
Access to XMLHttpRequest at 'https://seoranking.onrender.com/api/jobs/status' 
from origin 'https://seo-ranking-psi.vercel.app' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

## Solution Applied

I've updated `backend/server.js` to explicitly allow your Vercel domain.

### What Changed

The CORS configuration now:
- ✅ Allows your Vercel domain: `https://seo-ranking-psi.vercel.app`
- ✅ Allows all Vercel preview deployments: `https://seo-ranking-*.vercel.app`
- ✅ Allows localhost for development
- ✅ For now, allows all origins (you can restrict later if needed)

## Next Steps

### 1. Commit and Push the Changes

```bash
git add backend/server.js
git commit -m "Fix CORS to allow Vercel frontend requests"
git push
```

### 2. Render Will Auto-Deploy

Since your Render service is connected to GitHub:
- Render will detect the push
- It will automatically rebuild and redeploy
- This usually takes 2-5 minutes

### 3. Verify It Works

After Render finishes deploying:
1. Open your Vercel site
2. Try uploading a file or viewing jobs
3. Check browser console - CORS errors should be gone!

## Alternative: Quick Fix via Render Dashboard

If you don't want to wait for GitHub push:

1. Go to Render Dashboard → Your Backend Service
2. Go to **Settings** → **Environment**
3. Add/Update environment variable (if needed)
4. Click **Manual Deploy** → **Clear build cache & deploy**

Or simply restart the service to pick up code changes if you've already pushed.

## Verify Backend is Running

Test your backend directly:
1. Visit: `https://seoranking.onrender.com/health`
2. Should see: `{"status":"OK","message":"Server is running"}`

If you get CORS error even on direct visit, the backend might not be running.

## If Still Having Issues

1. **Check Render Logs**: Look for any errors during startup
2. **Verify CORS is Loading**: Check if backend console shows CORS configuration
3. **Test with curl**:
   ```bash
   curl -H "Origin: https://seo-ranking-psi.vercel.app" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://seoranking.onrender.com/api/jobs/status \
        -v
   ```

This should return `Access-Control-Allow-Origin` header if CORS is working.

