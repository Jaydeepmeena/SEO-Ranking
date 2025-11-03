# Fix: Vercel Running `npm run dev` Instead of Build

## Problem
Vercel is running `npm run dev` (development server) instead of `npm run build` (production build).

## Solution: Set Build Settings in Vercel Dashboard

Since Vercel is ignoring or overriding the `buildCommand` in `vercel.json`, you need to set it explicitly in the dashboard:

### Step-by-Step:

1. **Go to Vercel Dashboard** → Your Project
2. **Settings** → **Build & Development Settings**
3. **Override** the following settings:

   **Build Command:**
   ```
   cd frontend && npm install && npm run build
   ```
   
   **Output Directory:**
   ```
   frontend/dist
   ```
   
   **Install Command:**
   ```
   cd frontend && npm install
   ```
   
   **Root Directory:**
   ```
   (leave empty or set to repository root)
   ```

4. **Save** the settings
5. **Redeploy**

## Alternative: Set Root Directory to `frontend`

If you want Vercel to auto-detect (after setting Root Directory):

1. **Settings** → **General** → **Root Directory**: `frontend`
2. **Build & Development Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (should auto-fill)
   - **Output Directory**: `dist` (should auto-fill)
   - **Install Command**: `npm install` (should auto-fill)

3. **Save** and **Redeploy**

## Why This Happens

When Root Directory is set to `frontend`, Vercel:
- Auto-detects Vite framework
- But sometimes picks the wrong script
- Need to explicitly override Build Command

## Verify Build Command is Correct

After setting, check the deployment logs. You should see:
```
> rank-tracker-frontend@1.0.0 build
> vite build
```

NOT:
```
> rank-tracker-frontend@1.0.0 dev
> vite
```

## Quick Checklist

- [ ] Root Directory: Either empty (repo root) OR `frontend`
- [ ] Build Command: Explicitly set to `npm run build` (or `cd frontend && npm run build`)
- [ ] Output Directory: `dist` or `frontend/dist`
- [ ] Framework: Set to `Vite` OR leave as `Other`
- [ ] Save settings
- [ ] Redeploy

