# Diagram catalog and roadmap

This catalog prevents diagrams from becoming duplicated or contradictory. A diagram should be added only when it explains a relationship, state transition, or operational flow more clearly than prose.

## Existing diagrams

| Diagram | Location | Purpose |
|---|---|---|
| System overview | [README](../README.md) | One-screen project orientation |
| Component architecture | [architecture.md](architecture.md) | Browser, backend layers, and database boundaries |
| Protected request sequence | [architecture.md](architecture.md) | JWT validation and controller/service flow |
| Frontend routes | [architecture.md](architecture.md) | Public and protected route composition |
| Login sequence | [architecture.md](architecture.md) and [API.md](API.md) | Authentication exchange |
| Post creation sequence | [architecture.md](architecture.md) | Cross-service post creation flow |
| Deployment topology | [architecture.md](architecture.md) and [deployment.md](deployment.md) | Runtime hosting relationships |
| API access decision | [API.md](API.md) | Public versus authenticated requests |
| Logical and physical data models | [data-model.md](data-model.md) | Domain concepts and database tables |
| Post lifecycle | [data-model.md](data-model.md) | Draft/published state changes |
| Entity-to-DTO mapping | [data-model.md](data-model.md) | Persistence-to-API transformation |
| Terraform topology and pipeline | [terraform-readme.md](terraform-readme.md) | Azure resources and artifact delivery |
| User/application journeys | [application-guide.md](application-guide.md) | Reader and author behavior |
| Release rollback | [deployment.md](deployment.md) | Recovery decision flow |

## Recommended next diagrams

### 1. Authorization matrix and ownership flow — high priority

Show roles, endpoints, resource ownership, and the expected `403` behavior. This becomes most valuable when ownership checks or an admin role are implemented. The current API has authentication but not true resource authorization.

### 2. CI/CD pipeline — high priority after workflows are activated

Show branch triggers, tests, artifact creation, Azure login, backend deployment, frontend upload, environment approval, smoke tests, and rollback. The `.txt` workflow examples are inactive today, so a detailed pipeline diagram would otherwise imply automation that does not exist.

### 3. Error-handling flow — medium priority

Trace exceptions from validation, authentication, entity lookup, service conflicts, and unexpected failures into `ApiErrorResponse`. Add it when validation errors receive a dedicated handler.

### 4. Observability architecture — medium priority before production

Show application logs, metrics, traces, health checks, database monitoring, alerts, and operator ownership. None of these integrations currently exist in the repository.

### 5. Database migration lifecycle — high priority when Flyway/Liquibase is added

Show migration creation, review, test database application, deployment ordering, compatibility window, backup, and rollback. This should replace reliance on `ddl-auto=update`.

### 6. Pagination and filtering sequence — medium priority after API support

Show query parameters, repository query selection, page metadata, frontend state, and navigation. Current pagination/sorting UI is not backed by server behavior.

### 7. Content security flow — medium priority

Show TipTap HTML creation, request validation, database storage, DOMPurify sanitization, and safe rendering. This would clarify the current mismatch between supported editor nodes and the display allowlist.

### 8. Backup and disaster recovery — high priority for real data

Show PostgreSQL backups, retention, restore testing, infrastructure recreation, static asset redeployment, secrets recovery, recovery time objective, and recovery point objective.

## Diagrams to avoid for now

- A microservices diagram: the backend is one Spring Boot application.
- A Kubernetes diagram: no Kubernetes configuration exists.
- A message-queue/event diagram: the application is synchronous and has no broker.
- A cache topology: no cache is implemented.
- A comments or media model: those domains do not exist in the current code.

Adding these prematurely would describe an imagined architecture rather than the repository.
