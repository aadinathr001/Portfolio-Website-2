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

2. **Case Sensitivity & Asset Resolution**:
   - `src/components/ResumeModal.tsx` now imports `../assets/aadinath_r_resume.pdf?url`.
   - Both `aadinath_r_resume.pdf` and `Aadinath_R_Resume.pdf` are mirrored in `src/assets` and `public/assets/` to ensure zero casing mismatches on Linux-based GitHub Actions runners or local Windows/macOS clones.
   - `hero.webp` is synced across `src/assets/images/` and `public/assets/images/` so `./assets/images/hero.webp` resolves smoothly in dev and production.

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

## Mobile Responsive Architecture & Polish

The portfolio adheres to Swiss editorial design principles with touch-first ergonomics for smartphone viewports (320px–430px):

1. **Mobile Navigation**:
   - Upgraded from simple top menu to a **full-height slide-over drawer** with backdrop blur (`backdrop-blur-sm bg-[#121212]/35`).
   - Features body scroll lock (`document.body.style.overflow = "hidden"`), keyboard `Escape` listener, and generous `44px+` touch targets.
   - Pinned bottom CTA with direct technical CV access.

2. **Hero Section & Field Specimen**:
   - **Hero Image**: Rendered in **full color on mobile viewports** (`grayscale-0 md:grayscale md:hover:grayscale-0`) so touch devices see vivid color without needing cursor hover.
   - **Action Buttons**: Responsive full-width layout on extra small screens (`flex-col sm:flex-row w-full sm:w-auto`).

3. **Experience & Education Timelines**:
   - Mobile screens (`< md`) switch to **integrated cards with expand/collapse buttons in the header row** right next to the year, role/degree, and institution.
   - Desktop viewports (`>= md`) maintain the continuous high-contrast vertical spine (`w-[2px] bg-[#121212]`) and multi-column tabular grid.

4. **Tech Stack Explorer**:
   - Category navbar removes numbering prefixes, increases font size (`text-xs sm:text-sm`), and formats tool counts as crisp superscripts (`<sup>`).
   - Mobile screens (`< lg`) display the architectural specification panel **inline directly underneath the selected tool card**, eliminating the need to scroll past long lists.
   - Desktop screens (`lg:`) retain the sticky right-column specification card.

5. **Touch & Modal Safeguards**:
   - In `ResumeModal.tsx`, a mobile helper banner provides a direct one-tap fullscreen PDF fallback for mobile browsers that do not render iframes natively.
   - Contact box padding is optimized (`p-5 sm:p-8`) with minimum `40px` tap hitboxes on social coordinates.

---

## AI Model Provider Configuration (`.env`)

Environment variables and model configurations are maintained in `.env` (with `.env.example` as a template):

```bash
# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Groq API
GROQ_API_KEY=your_groq_api_key

# Ollama Local Endpoint (Default: http://localhost:11434)
OLLAMA_BASE_URL=http://localhost:11434
```

Supported Model Options:
- **Ollama (Local)**: Runs locally on `http://localhost:11434` for air-gapped or private inference (e.g. `llama3`, `mistral`, `deepseek-r1`).
- **Groq**: High-speed inference for Llama 3 models with ultra-low latency.
- **Gemini**: Google's multimodal models (`gemini-2.5-flash`, `gemini-2.5-pro`).
- **OpenAI**: Standard GPT-4o / GPT-4o-mini endpoints.

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
