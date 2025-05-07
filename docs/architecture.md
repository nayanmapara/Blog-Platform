# Architecture Overview

## Backend
- Spring Boot REST API
- JWT authentication
- Layered architecture (Controller → Service → Repository)
- MapStruct for DTO mapping
- PostgreSQL as RDBMS

## Frontend
- React + Vite
- Axios for API calls
- JWT token stored in localStorage

## Docker
- PostgreSQL + Adminer managed via `docker-compose.yml`

## Security
- Spring Security configured to allow public access to `GET` routes
- Protected routes require JWT

## Folder Structure
```
├── src/main/java/com/devtiro/blog/
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── domain
│   ├── config
│   └── mappers
```
