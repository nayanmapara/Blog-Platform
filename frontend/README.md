# Blog Platform frontend

React 18 + TypeScript single-page client built with Vite, NextUI, Tailwind CSS, Axios, TipTap, DOMPurify, Framer Motion, and React Router.

## Run locally

```bash
npm install
npm run dev
```

The client normally starts on <http://localhost:5173>.

The current API base URL is hard-coded in `src/services/apiService.ts` to the deployed Render backend. For local full-stack work, change it to `http://localhost:8080/api/v1`. The proxy in `vite.config.ts` only applies when requests use a relative `/api` URL.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Type-check and create `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |
| `npm run clean` | Remove build/dependency artifacts and npm cache |

## Application structure

- `src/App.tsx`: providers, routing, route protection, and theme state
- `src/components/AuthContext.tsx`: login/logout and token state
- `src/components/NavBar.tsx`: navigation and authenticated actions
- `src/components/PostForm.tsx`: TipTap post editor
- `src/components/PostList.tsx`: post summaries, sorting UI, and pagination UI
- `src/pages/`: route-level screens
- `src/services/apiService.ts`: API types and Axios client

## Authentication behavior

The JWT is stored in `localStorage`. An Axios interceptor adds it to outgoing requests. Any `401` clears the token and redirects to `/login`. On refresh, the presence of a token is treated as authenticated; the client does not validate it until an API call fails because the backend has no profile/session endpoint.

## Known integration gaps

- `VITE_API_BASE_URL` is not implemented.
- Category editing calls `PUT /categories/{id}`, which the backend does not provide.
- UI pagination and sorting change local state, but backend list responses are not paginated or sorted by request parameters.
- Post rendering allows fewer HTML tags than the editor produces, so headings and lists disappear on display.
- The authenticated user's profile is never loaded, leaving the navbar avatar/name empty.
- There is no frontend automated test suite.

## Production build

```bash
npm run lint
npm run build
npm run preview
```

Vite outputs static assets to `dist/`. Azure Terraform uploads those files to the storage account `$web` container; build the frontend before running Terraform apply when the blob resources are in scope.
