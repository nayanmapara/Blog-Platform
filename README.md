# Blog Platform App

A full-stack blogging platform built with Spring Boot (Java), PostgreSQL, and React, deployed using Terraform on Azure.

## Features
- JWT-based Authentication
- Role-based access control
- CRUD operations for Posts, Categories, Tags
- PostgreSQL via Docker Compose (for local dev)
- React frontend with live preview
- Infrastructure provisioned via Terraform
- Deployment on Azure App Services (Backend & Frontend)

## Tech Stack
- **Backend**: Spring Boot, Spring Security, JWT, MapStruct, JPA
- **Frontend**: React + Vite (Node 20+)
- **Database**: PostgreSQL + Adminer (via Docker)
- **IaC & Deployment**: Terraform, Azure


## Getting Started

### Backend Setup (Local Dev)
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Setup (Local Dev)
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup for PostgreSQL
```bash
docker-compose up
```
_Access DB Admin UI at: http://localhost:8888_

### Environment Variables

The following environment variables must be set for the application to run correctly:

#### Backend
- `SPRING_DATASOURCE_URL`: JDBC URL for PostgreSQL (e.g., `jdbc:postgresql://localhost:5432/blogdb`)
- `SPRING_DATASOURCE_USERNAME`: PostgreSQL database username
- `SPRING_DATASOURCE_PASSWORD`: PostgreSQL database password
- `JWT_SECRET`: Secret key for signing JWT tokens

#### Frontend (if using .env.local)
- `VITE_API_BASE_URL`: Base URL for the backend API (e.g., `http://localhost:8080/api`)

Make sure to configure these variables in your local environment or deployment pipeline (e.g., GitHub Secrets or Azure App Settings).
"""


## Deployment (Azure via Terraform)
1. Navigate to the `infra/` directory.
2. Update `terraform.tfvars` with your Azure credentials and config.
3. Run:
    ```bash
    terraform init
    terraform apply
    ```
4. Frontend and Backend will be deployed to Azure Web Apps.

_See [`infra/README.md`](infra/README.md) for full Terraform setup instructions._



## API Documentation
See [`docs/API.md`](docs/API.md)

## ERD & Architecture
See [`docs/ERD.md`](docs/ERD.md) and [`docs/architecture.md`](docs/architecture.md)



## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
