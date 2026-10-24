# Aadinath R — Portfolio Project Documentation & GitHub Pages Guide

## Overview
A high-performance, minimalist editorial developer portfolio for **Aadinath R** (AI/ML Engineer & Full-Stack Developer). Built with React 19, TypeScript, Vite, and Tailwind CSS.

---

## Why the Web Page Was Blank on GitHub Pages

When hosting a Vite SPA on GitHub Pages under a repository subpath (e.g. `https://<username>.github.io/Portfolio-Website-2/`), three critical issues caused a blank white screen:

1. **Absolute Base Path (`base: '/'`) vs Relative Base Path (`base: './'`)**:
   - In `vite.config.ts`, `base` defaulted to `'/'`.
   - The compiled `index.html` contained `<script src="/assets/index-....js">`.
   - On GitHub Pages, the browser requested `https://<username>.github.io/assets/...` instead of `https://<username>.github.io/Portfolio-Website-2/assets/...`.
   - Because the script returned 404, the React root never initialized, resulting in a blank page.
   - **Fix Applied**: Added `base: './'` to `vite.config.ts` so all assets are resolved relative to the deployment URL.

2. **Case Sensitivity in File Import**:
   - `src/components/ResumeModal.tsx` was importing `../assets/aadinath_r_resume.pdf?url`.
   - The file on disk was named `Aadinath_R_Resume.pdf`.
   - On Linux-based GitHub Actions runners, this casing mismatch threw `[UNRESOLVED_IMPORT]` and aborted the build job.
   - **Fix Applied**: Updated `ResumeModal.tsx` import to match the exact casing `Aadinath_R_Resume.pdf`, and provided fallback lowercased symlink/copies in both `src/assets` and `public/assets`.

3. **Asset Paths in `portfolioData.ts`**:
   - Several image paths were prefixed with `/public/` or `/src/` (e.g. `/public/assets/images/hero.jpg`, `/src/assets/images/...`).
   - In production builds, `/src/` and `/public/` prefixes are invalid because files in `public/` are served from `./assets/images/...`.
   - **Fix Applied**: Copied all image assets to `public/assets/images/` and updated `src/data/portfolioData.ts` to use clean relative paths `./assets/images/...`.

4. **Jekyll Processing Interference**:
   - GitHub Pages by default passes all repositories through Jekyll, which ignores directories starting with underscores and can interfere with static asset bundles.
   - **Fix Applied**: Added `.nojekyll` to `public/` and ensured `touch dist/.nojekyll` runs during the workflow.

---

## GitHub Repository Settings Required

In your GitHub repository (`Portfolio-Website-2`):

1. Go to **Settings** > **Pages**
2. Under **Build and deployment**:
   - Set **Source** to: **`GitHub Actions`** (DO NOT select "Deploy from a branch").
3. Commit and push the updated files:
   ```bash
   git add .
   git commit -m "fix: set relative base path, sync assets and nojekyll"
   git push origin main
   ```
4. Head over to the **Actions** tab in your repository. The **Deploy to GitHub Pages** workflow will run and deploy the site cleanly within ~30–45 seconds.

---

## Local Development & Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run static production build test
npm run build

# Run TypeScript lint check
npm run lint
```
