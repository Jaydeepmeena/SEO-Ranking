# Troubleshooting Environment Variable Issues

## Problem: Still seeing `localhost:5000` in production

If you're still seeing `localhost:5000` errors after setting `VITE_API_URL`, here's how to fix it:

## Critical: Environment Variables Must Be Set BEFORE Build

⚠️ **Important**: Vite bakes environment variables into the build at **build time**, not runtime. This means:

1. ✅ Set `VITE_API_URL` in Vercel **BEFORE** deploying
2. ✅ Environment variable must be set for **Production** environment
3. ✅ Must **Redeploy** after setting the variable (new build required)

## Step-by-Step Fix

### 1. Verify Environment Variable is Set

In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Look for `VITE_API_URL`
3. **Verify**:
   - ✅ Name is exactly: `VITE_API_URL` (case-sensitive)
   - ✅ Value is your Render backend URL + `/api`
   - ✅ **Production** checkbox is checked

### 2. Check the Value Format

The value should be:
```
https://your-backend-name.onrender.com/api
```

Common mistakes:
- ❌ Missing `/api` at the end
- ❌ Using `http://` instead of `https://`
- ❌ Extra trailing slash: `https://...onrender.com/api/` (remove the trailing slash)
- ❌ Wrong URL format

### 3. Force a New Build

After setting/updating the environment variable:

1. Go to **Deployments** tab
2. Find the latest deployment
3. Click **⋯** (three dots) → **Redeploy**
4. **Important**: Make sure you see the environment variable in the build logs

### 4. Verify in Build Logs

During build, check the logs for:
```
Installing dependencies...
Building...
```

You should **NOT** see any errors about missing environment variables.

### 5. Check Browser Console

After redeploying, open your Vercel site and check the browser console. You should see:

```
🔗 API URL configured: https://your-backend.onrender.com/api
```

**NOT:**
```
🔗 API URL configured: http://localhost:5000/api
```

## Debug Steps

### Step 1: Check if Variable is Accessible

1. Open your deployed Vercel site
2. Open browser DevTools (F12)
3. Go to Console tab
4. Look for the debug logs:
   ```
   🔗 API URL configured: ...
   🔍 Environment check: {...}
   ```

### Step 2: Test Variable Value Directly

In browser console, run:
```javascript
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
```

This will show you what value is actually being used.

### Step 3: Verify Render Backend is Running

1. Open your Render backend URL directly: `https://your-backend.onrender.com/health`
2. You should see: `{"status":"OK","message":"Server is running"}`
3. If not, check Render logs for backend issues

## Common Issues and Solutions

### Issue 1: Variable Set But Still Using Localhost

**Cause**: Variable was set AFTER the build, or wrong environment selected.

**Solution**:
1. Ensure variable is set for **Production** environment
2. Redeploy to trigger a new build
3. The build must happen AFTER the variable is set

### Issue 2: Variable Name Wrong

**Cause**: Typos in variable name.

**Solution**: 
- Must be exactly: `VITE_API_URL` (uppercase, with underscores)
- Not: `VITEAPIURL`, `vite_api_url`, `API_URL`, etc.

### Issue 3: Variable Value Wrong Format

**Cause**: Missing `/api` or wrong URL format.

**Solution**:
- Must be: `https://your-backend.onrender.com/api`
- Include `https://`
- Include `/api` at the end
- No trailing slash after `/api`

### Issue 4: Multiple Environments

**Cause**: Variable only set for Preview, not Production.

**Solution**:
1. Edit the environment variable
2. Check **ALL** environments: Production, Preview, Development
3. Save and redeploy

## Verification Checklist

Before asking for help, verify:

- [ ] `VITE_API_URL` exists in Vercel Environment Variables
- [ ] Variable name is exactly `VITE_API_URL` (case-sensitive)
- [ ] Value includes `https://` and ends with `/api`
- [ ] **Production** environment is checked
- [ ] Redeployed after setting the variable
- [ ] Browser console shows correct API URL (not localhost)
- [ ] Render backend is accessible at the URL
- [ ] CORS is enabled on backend

## Still Not Working?

1. **Screenshot** your Vercel Environment Variables page
2. **Check** browser console for the debug logs
3. **Verify** Render backend is running
4. **Try** accessing backend directly: `https://your-backend.onrender.com/api/jobs/status`

If the backend works directly but frontend fails, it's an environment variable issue.

