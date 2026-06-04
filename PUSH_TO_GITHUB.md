# Push AchouPro to GitHub

Repository: https://github.com/MingLim009/Web-Platform.git

## One-time setup (already done if you used the agent)

```powershell
cd d:\work\Task5\project
git remote add origin https://github.com/MingLim009/Web-Platform.git
git branch -M main
```

## Push (run in PowerShell)

```powershell
cd d:\work\Task5\project
git add .
git status
git commit -m "Initial commit: AchouPro Next.js platform"
git push -u origin main
```

If Git asks you to sign in, use a **Personal Access Token** as the password (GitHub → Settings → Developer settings → Personal access tokens).

## Never commit

- `.env` / `.env.local` (secrets) — listed in `.gitignore`
- `node_modules/`, `.next/`, `prisma/*.db`
