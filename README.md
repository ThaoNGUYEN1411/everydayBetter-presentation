# React + TypeScript + Vite

# Getting started

## Prerequisites:

- NodeJS
- NPM
- A decent shell (ex: gitbash)
- To avoid CORS issue, you MUST run app front `http://localhost:5173/`

## Insatalling requirements

- VSC and plugin installation : Prettier

- Install dependencies

```bash
npm install
```

- Run Vite for dev environnement

```bash
npm run dev
```

- Run Vite for prod environnement

```bash
npm run build
```

### Custom to manage environnement

Create files (on the root) and custom your environnement variables with Vite convention:

```
everydaybetter-presentation/
├── public/
├── src/
│   └── directories...
│   └── ...
├── .env.development
├── .env
├── package.json
```

- For dev environnement
  File name: `.env.development`

  Variable template: `VITE_API_URL=http://localhost:8080`

- For prod environnement
  File name: `.env`
  Variable template: `VITE_API_URL=https://<domain-name>`

- For call variable, you can use:
  `const apiUrl = import.meta.env.VITE_API_URL;`
