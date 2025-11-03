# Fix Vercel Build: "cd frontend: No such file or directory"

## Problem
Vercel build fails with: `sh: line 1: cd: frontend: No such file or directory`

## Root Cause
Vercel can't find the `frontend` directory. This happens when:
- Root Directory is set incorrectly in Vercel dashboard
- Build commands use `cd` which doesn't work in Vercel's context

## Solution: Set Root Directory in Vercel Dashboard

### Step 1: Go to Vercel Dashboard
1. Open your project: https://vercel.com
2. Select **SEO Ranking** project

### Step 2: Configure Root Directory
1. Go to **Settings** → **General**
2. Scroll to **Root Directory**
3. Click **Edit**
4. Enter: `frontend`
5. Click **Save**

### Step 3: Update Build Settings
1. Go to **Settings** → **Build & Development Settings**
2. Configure:
   - **Framework Preset**: `Vite` (or `Other`)
   - **Build Command**: `npm run build` (auto-filled if Vite detected)
   - **Output Directory**: `dist` (auto-filled if Vite detected)
   - **Install Command**: `npm install` (auto-filled)

### Step 4: Simplify vercel.json

After setting Root Directory to `frontend`, you can simplify `vercel.json` to just:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

OR remove `vercel.json` entirely - Vercel will auto-detect Vite.

### Step 5: Redeploy
1. Go to **Deployments**
2. Click **Redeploy** on latest deployment
3. Should build successfully now

## Alternative: Use vercel.json Without Root Directory

If you DON'T set Root Directory (leave empty), keep the current `vercel.json` but use `--prefix` instead of `cd`:

The updated `vercel.json` I created uses:
```json
{
  "buildCommand": "npm install --prefix frontend && npm run build --prefix frontend"
}
```

This should work without Root Directory setting.

## Which Method to Use?

### Method 1: Set Root Directory = `frontend` (Recommended)
- ✅ Simpler configuration
- ✅ Vercel auto-detects Vite
- ✅ Less configuration needed
- ❌ Requires changing Vercel settings

### Method 2: Use `--prefix` in vercel.json
- ✅ No dashboard changes needed
- ✅ Works from repo root
- ❌ Slightly more complex commands

## Current Status

I've updated `vercel.json` to use `--prefix` which should work. But **the easiest fix is to set Root Directory to `frontend`** in Vercel dashboard.

## Verify It Works

After fixing, check build logs:
- Should see: `Running build command...`
- Should see: `Installing dependencies...`
- Should see: `Building...`
- Should see: `Build completed`

No more "No such file or directory" errors!

