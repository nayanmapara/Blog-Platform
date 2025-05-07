# API Documentation

## Authentication
- `POST /api/v1/auth/login`: Login with email/password

## Categories
- `GET /api/v1/categories`: List categories
- `POST /api/v1/categories`: Create category (auth required)
- `DELETE /api/v1/categories/{id}`: Delete category (auth required, must be empty)

## Tags
- `GET /api/v1/tags`: List tags
- `POST /api/v1/tags`: Bulk create tags (auth required)
- `DELETE /api/v1/tags/{id}`: Delete tag (auth required, must be unused)

## Posts
- `GET /api/v1/posts`: List all posts (public)
- `POST /api/v1/posts`: Create post (auth required)
- `PUT /api/v1/posts/{id}`: Update post (auth required)
- `DELETE /api/v1/posts/{id}`: Delete post (auth required)
