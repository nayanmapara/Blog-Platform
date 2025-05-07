# Blog Platform App

A full-stack blogging platform built with Spring Boot (Java), PostgreSQL, and React.

## Features
- JWT-based Authentication
- Role-based access control
- CRUD operations for Posts, Categories, Tags
- PostgreSQL via Docker Compose
- React frontend with live preview

## Tech Stack
- **Backend**: Spring Boot, Spring Security, JWT, MapStruct, JPA
- **Frontend**: React + Vite (Node 20+)
- **Database**: PostgreSQL + Adminer (via Docker)

---

## Getting Started

### Backend Setup
```bash
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Docker Setup for DB
```bash
docker-compose up
```

Access DB Admin UI at: http://localhost:8888

---

## API Documentation
See [`docs/API.md`](docs/API.md)

## ERD & Architecture
See [`docs/ERD.md`](docs/ERD.md) and [`docs/architecture.md`](docs/architecture.md)

---
## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

