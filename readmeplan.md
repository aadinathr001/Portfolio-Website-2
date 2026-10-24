# Aadinath R — Systems & AI Engineering Portfolio

## Overview
A minimal editorial portfolio inspired by Swiss graphic design, architectural field notes, technical documentation, and contemporary high-precision software. Designed with disciplined typography (Manrope + Inter + JetBrains Mono), hairline borders, quiet luxury styling, and a RAG-grounded contextual assistant.

---

## Architectural & Design Principles
1. **Typography Hierarchy**:
   - `H1`: Manrope 800 (64–80px)
   - `H2`: Manrope 700 (40–52px)
   - `H3`: Manrope 700 (24–32px)
   - `Body`: Inter 400 (16–18px)
   - `Small / Metadata`: Inter 500 / JetBrains Mono (13–14px / 10–12px)
2. **Visual System**:
   - Palette: Bone paper (`#fbfbf9`), crisp slate ink (`#121212`), hairline gray borders (`#e6e6e1`), architectural rust accent (`#c26d52`).
   - Anti-generic SaaS: Zero neon purple/cyan gradients, no excessive rounded cards, no glowing buttons, no glassmorphism.
   - Clean micro-interactions: Understated transitions, hairline underline indicators, and hover disclosures.

---

## Portfolio Sections & Components
- **Hero (`/src/components/Hero.tsx`)**: Editorial introduction, authentic portrait framing, key coordinates, and quick links.
- **Projects (`/src/components/Projects.tsx`)**: Case studies with architecture tags, metric callouts, and live system links.
- **Experience (`/src/components/Experience/`)**: Interactive timeline with expandable/collapsible roles and technical details.
- **Tech Stack (`/src/components/TechStack.tsx`)**:
  - Clean category navigation bar with enlarged button typography (`text-sm sm:text-base`).
  - Superscript item counters (`<sup>{count}</sup>`).
  - Interactive specification inspector with production use cases and documentation links.
- **Education (`/src/components/Education/`)**: Academic credentials, certifications, and technical proficiencies.
- **Contact (`/src/components/Contact.tsx`)**: Direct coordinates, PGP fingerprint, and inquiry channels.
- **Resume Modal (`/src/components/ResumeModal.tsx`)**: In-app viewer and direct download of PDF resume.
- **RAG Chat Assistant (`/api/chat.ts`, `/server.ts`, `/src/utils/ragEngine.ts`)**: Server-side retrieval-augmented portfolio Q&A with Groq/LLM integration.

---

## Environment Configuration
Credentials and model configurations are maintained in `.env`:
```env
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Supported LLM providers & model configurations:
- **Groq**: `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, `mixtral-8x7b-32768`
- **Gemini**: `@google/genai` integration
- **Ollama (Local)**: Local inference endpoints
- **OpenAI**: Compatible chat completion endpoints

---

## Build & Deployment
- **Development**: `npm run dev` (Runs `tsx server.ts` with Vite middleware on port 3000)
- **Production Build**: `npm run build`
- **Production Server**: `npm run start` (Runs `tsx server.ts` serving static `/dist`)
- **Type Checking**: `npm run lint` (`tsc --noEmit`)

---

## Hosting on GitHub Pages
To host this Vite React application on GitHub Pages:
1. **Critical Setting in GitHub**:
   - In your GitHub repo, go to **Settings** > **Pages** (in left sidebar).
   - Under **Build and deployment** > **Source**, change from `Deploy from a branch` to **`GitHub Actions`**.
   - *Why this is essential*: If left on `Deploy from a branch (main / root)`, GitHub Pages serves the raw repository root where `index.html` references `/src/main.tsx`, which causes the browser error `Failed to load resource: 404 main.tsx`. Selecting **GitHub Actions** instructs GitHub to run our workflow, compile the TypeScript into `./dist`, and serve the bundled JavaScript.
2. **Automated Deployment**:
   - The `.github/workflows/deploy.yml` workflow will automatically run on every push to `main`, install dependencies, run `npm run build`, add `.nojekyll`, and deploy the compiled `/dist` directory to GitHub Pages.
3. **Asset Resolution (`base: './'`)**:
   - Vite is configured with `base: './'` in `vite.config.ts`, ensuring all JS and CSS bundles load correctly under repository subpaths (`https://<username>.github.io/<repo-name>/`).
4. **Backend Note**:
   - GitHub Pages serves static files only. For the Groq-powered chat assistant endpoint (`/api/chat`), deploy the backend on **Vercel** (`vercel.json`), Render, Railway, or Cloud Run.
