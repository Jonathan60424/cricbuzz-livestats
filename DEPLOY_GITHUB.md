# Deploy Cricbuzz LiveStats on GitHub Pages

This project is a static React/Vite dashboard, so it can be deployed directly to GitHub Pages without a backend. The dashboard uses realistic demo data and client-side interactions; the live score feed is currently mocked until a server-side Cricbuzz API integration is added.

## Fastest deployment

1. Create a new GitHub repository named `cricbuzz-livestats` (or use any repository name).
2. Push this project to the repository's `main` branch:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git branch -M main
git push -u origin main
```

3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source.
5. The included workflow at `.github/workflows/deploy-pages.yml` will build and deploy the site automatically.
6. After the workflow completes, GitHub will show the public demo URL under **Settings → Pages** and in the workflow deployment environment.

The Vite configuration automatically detects the GitHub repository name during Actions builds, so repository subpaths work correctly.

## Local demo

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. To test the production output locally:

```bash
pnpm run build:github
pnpm vite preview --host
```

## Included dashboard features

- Overview dashboard with match center, KPIs, performance trend, and player momentum.
- Live Center with scorecards, required run rate, commentary, and match switching.
- Player Stats leaderboard with format filters.
- SQL Lab with 25 cricket analytics query prompts, search, and sample result output.
- Data Manager with add-player CRUD demonstration.
- Navy-blue default theme and yellow-white Matchday theme toggle.
- Responsive mobile layout and GitHub Pages deployment automation.

## Important production note

GitHub Pages serves only static frontend files. Do not place Cricbuzz API keys in the React client. For real-time production data, add a secure serverless function, proxy, or backend service that stores the API key on the server and returns only the required match data to the dashboard.
