# Contributing

## Development workflow

1. Start PostgreSQL with `docker compose up -d` in `backend/blog`.
2. Run the backend with the Java 21 Maven wrapper.
3. Run the frontend with Node 20+ and npm.
4. Keep API DTOs and the TypeScript interfaces in `frontend/src/services/apiService.ts` aligned.
5. Update the relevant file in `docs/` whenever routes, security rules, entities, configuration, or infrastructure change.

## Verification checklist

Before submitting a change:

```bash
# Backend
cd backend/blog
./mvnw test

# Frontend
cd ../../frontend
npm run lint
npm run build

# Infrastructure
cd ../infra
terraform fmt -check
terraform validate
```

Windows PowerShell users should run `.\mvnw.cmd test` for the backend and may need `npm.cmd` if PowerShell script execution is restricted.

## Testing expectations

- Service changes should include unit tests for success and failure paths.
- Controller/security changes should include MockMvc integration tests for public, authenticated, unauthorized, and forbidden behavior.
- Repository query changes should include data-layer tests.
- Frontend behavior should be covered with a component test framework before the UI grows further; Vitest and React Testing Library are a natural fit for Vite.
- Bug fixes should include a regression test where practical.

## API and data-model changes

- Treat DTOs as the public contract; do not serialize JPA entities directly.
- Document status codes, authentication requirements, query parameters, and example payloads in `docs/API.md`.
- Update `docs/ERD.md` and its image when entity relationships change.
- Prefer explicit database migrations for production schema changes.

## Security checklist

- Never commit production credentials, JWT secrets, Terraform variable files, or cloud connection strings.
- Do not use the checked-in development password or seeded account in production.
- Enforce resource ownership/roles in the backend; hiding a UI button is not authorization.
- Sanitize rich-text HTML on output and keep the editor/display tag allowlists aligned.
- Restrict database firewall rules and CORS origins to required networks/origins.

## Commit and pull request guidance

Keep changes focused and describe:

- what changed and why;
- affected routes/configuration/data models;
- verification commands and results;
- screenshots for visible UI changes;
- migration or rollout considerations.
