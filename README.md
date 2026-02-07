# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment

To deploy this Vite + React project to Vercel:

1. Push your repository to GitHub, GitLab or Bitbucket.
2. Go to https://vercel.com and import the repository.
3. When configuring the project, set the following (these are usually auto-detected):
	- Build Command: `npm run build`
	- Output Directory: `dist`
4. Add any environment variables your app needs in the Vercel project settings.
5. Trigger a deploy — Vercel will run the build and publish the `dist` folder.

Local preview of production build:

```bash
npm install
npm run build
npm run preview
```

If you prefer explicit Vercel configuration, create a `vercel.json` file in the project root (example included in the repo).
