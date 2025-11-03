# Fixing Vercel Build Error

## Error Message
```
sh: line 1: cd: frontend: No such file or directory
Error: Command "cd frontend && npm install && npm run build" exited with 1
```

## Solution: Configure Root Directory in Vercel

### Option 1: Set Root Directory to `frontend` (Recommended)

1. Go to your **Vercel Dashboard**
2. Select your project
3. Go to **Settings** → **General**
4. Scroll down to **Root Directory**
5. Click **Edit**
6. Enter: `frontend`
7. Click **Save**

### Option 2: Update vercel.json (Already Done)

I've updated `vercel.json` to use `--prefix` instead of `cd`, which should work from the repository root.

The new build command:
```json
"buildCommand": "npm install --prefix frontend && npm run build --prefix frontend"
```

This uses npm's `--prefix` flag which is more reliable than `cd` commands.

## After Making Changes

1. **Commit and push** the updated `vercel.json`:
   ```bash
   git add vercel.json
   git commit -m "Fix Vercel build command"
   git push
   ```

2. **Redeploy** in Vercel:
   - Go to **Deployments**
   - Click **Redeploy** on the latest deployment

## Verify Root Directory Setting

After setting Root Directory to `frontend`:
- Vercel will automatically look for `package.json` in the `frontend` folder
- Build commands will run from the `frontend` directory
- You might not even need `vercel.json` anymore (Vercel will auto-detect Vite)

## Alternative: Remove vercel.json (If Root Directory is Set)

If you set Root Directory to `frontend`, you can simplify or remove `vercel.json`:

**Minimal vercel.json** (if Root Directory = `frontend`):
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

Vercel will auto-detect Vite and run the build automatically.

