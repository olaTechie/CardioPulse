# CardioPulse

CardioPulse is a production-ready React/Vite migration of the original **CardioPredict AI Pro** Streamlit dashboard. It keeps the same clinical assessment workflow: patient inputs, real-time risk scoring, dashboards, analytics, reports, patient comparison, history, settings, and GitHub Pages deployment.

## Migration Strategy

- Streamlit sidebar inputs were migrated to a persistent React patient panel.
- Streamlit tabs became React Router pages: Overview, Analytics, Reports, Data Explorer, Insights, and Settings.
- Session state became React Context plus `localStorage`.
- Plotly visualizations were rebuilt with Recharts and custom animated UI.
- Report export was rebuilt as browser-native TXT download and print.
- The PyCaret `.pkl` model cannot execute in a static browser deployment. This version includes a transparent client-side cardiovascular risk engine that preserves the user workflow. For clinical production use, replace `src/utils/riskModel.js` with an API call to a secured PyCaret/LightGBM inference service.

## Repository Name

Recommended GitHub repository name: **CardioPulse**

Vite base path and deployment URL use the same name:

```txt
https://<github-user>.github.io/CardioPulse/
```

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

The build script copies `dist/index.html` to `dist/404.html` so direct React Router URLs work on GitHub Pages.

## GitHub Pages Deployment

1. Create the repository:

```bash
gh repo create CardioPulse --public --source=. --remote=origin --push
```

2. In GitHub, open **Settings > Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main`.

The workflow in `.github/workflows/deploy.yml` installs dependencies, builds the Vite app with `base: "/CardioPulse/"`, uploads the static artifact, and deploys it to GitHub Pages.

## Project Structure

```txt
src/
  components/   Reusable UI, forms, metric cards, charts
  data/         Default patient values, templates, options
  hooks/        Context and persistence hooks
  layouts/      Persistent app shell and navigation
  pages/        Route-level screens
  styles/       Global design system
  utils/        Risk scoring and report generation
```

## Scripts

```bash
npm run dev       # Start Vite development server
npm run build     # Build for GitHub Pages and create SPA fallback
npm run preview   # Preview production build
```

## Medical Disclaimer

CardioPulse is intended for educational and clinical support demonstration only. It is not a medical device and does not replace professional clinical judgment.
