# Quick Guide: Vercel Environment Variable Setup

## Step-by-Step Instructions

### 1. In Vercel Dashboard:

Go to: **Settings** → **Environment Variables**

### 2. Add New Variable:

Click **"Add New"** button

### 3. Fill in the form:

**Key (Name):**
```
VITE_API_URL
```
⚠️ **Important**: 
- Must have underscores: `VITE_API_URL` (not `VITEAPIURL`)
- Must start with `VITE_` (Vite requirement)
- Case sensitive: all uppercase

**Value:**
```
https://your-backend-name.onrender.com/api
```
⚠️ **Important**: 
- Replace `your-backend-name` with your actual Render backend service name
- Must end with `/api`
- Include `https://`
- No trailing slash after `/api`

**Example of complete value:**
```
https://seo-ranking-backend-abc123.onrender.com/api
```

### 4. Select Environments:

Check all three:
- ✅ **Production**
- ✅ **Preview** 
- ✅ **Development**

### 5. Save

Click **"Save"** button

### 6. Redeploy

- Go to **Deployments** tab
- Click **⋯** (three dots) on latest deployment
- Click **"Redeploy"**

## How to Find Your Render Backend URL

1. Go to https://dashboard.render.com
2. Click on your backend service
3. Look for the service URL (e.g., `seo-ranking-backend-xyz.onrender.com`)
4. Copy it and add `/api` to the end

## Verify It Worked

After redeploying, check browser console:
- Should see API calls going to your Render URL
- Should NOT see `localhost:5000` errors

## Common Mistakes

❌ `VITEAPIURL` (no underscores)  
✅ `VITE_API_URL` (with underscores)

❌ `https://backend.onrender.com` (missing /api)  
✅ `https://backend.onrender.com/api` (with /api)

❌ `http://...` (http instead of https)  
✅ `https://...` (use https)

