# Aerial Fun & Fitness — Content Hub

## Setup & Deploy to Vercel (Step by Step)

### Step 1 — Get the code onto GitHub
1. Go to github.com → New repository → name it `aff-content-app` → Create
2. Upload all these files (drag and drop the folder, or use GitHub Desktop)

### Step 2 — Deploy to Vercel
1. Go to vercel.com → Sign in with GitHub
2. Click "Add New Project" → import your `aff-content-app` repo
3. Click Deploy — Vercel auto-detects Next.js ✓

### Step 3 — Add a Postgres database
1. In Vercel dashboard → your project → Storage tab
2. Click "Create Database" → choose Postgres → Create
3. Vercel automatically adds all POSTGRES_* env vars to your project ✓

### Step 4 — Add your environment variables
In Vercel → your project → Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| JWT_SECRET | any long random string (e.g. type 40 random chars) |
| ELENA_PASSWORD | your chosen password for Elena |
| ZINA_PASSWORD | your chosen password for Zina |

### Step 5 — Redeploy
After adding env vars, go to Deployments → click the 3 dots on latest → Redeploy

### Step 6 — Share the URLs
- Form for Zina: `https://your-app.vercel.app/form`
- Admin dashboard: `https://your-app.vercel.app/admin`

## Logins
- Username: `elena` / Password: whatever you set for ELENA_PASSWORD
- Username: `zina` / Password: whatever you set for ZINA_PASSWORD

## Changing passwords
Update the environment variables in Vercel → Settings → Environment Variables → Redeploy
