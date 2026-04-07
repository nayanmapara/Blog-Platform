# Data model

This document describes the Blog Platform's data from four perspectives: domain concepts, physical PostgreSQL tables, entity lifecycle, and API representation. The implementation source of truth is the JPA model under `backend/blog/src/main/java/me/nayanm/blog/domain/entities`.

## Conceptual domain model

This view focuses on business meaning rather than columns or join tables.

```mermaid
classDiagram
    class User {
        +UUID id
        +String email
        +String name
        +LocalDateTime createdAt
    }

    class Post {
        +UUID id
        +String title
        +HTML content
        +PostStatus status
        +Integer readingTime
        +LocalDateTime createdAt
        +LocalDateTime updatedAt
    }

    class Category {
        +UUID id
        +String name
    }

    class Tag {
        +UUID id
        +String name
    }

    class PostStatus {
        <<enumeration>>
        DRAFT
        PUBLISHED
    }

    User "1" --> "0..*" Post : authors
    Category "1" --> "0..*" Post : classifies
    Post "0..*" -- "0..*" Tag : tagged with
    Post --> PostStatus : has status
```

Key rules:

- Every post requires one author and one category.
- A post can have zero or more tags.
- A user can author any number of posts.
- A category or tag can exist without posts.
- Post status is either `DRAFT` or `PUBLISHED`.

## Physical database model

The `post_tags` table implements the many-to-many post/tag relationship. It is created by JPA from `Post.tags` and is not represented by a Java entity.

```mermaid
erDiagram
    USERS ||--o{ POSTS : "author_id"
    CATEGORIES ||--o{ POSTS : "category_id"
    POSTS ||--o{ POST_TAGS : "post_id"
    TAGS ||--o{ POST_TAGS : "tag_id"

    USERS {
        uuid id PK
        varchar email UK
        varchar password
        varchar name
        timestamp created_at
    }

    CATEGORIES {
        uuid id PK
        varchar name UK
    }

    TAGS {
        uuid id PK
        varchar name UK
    }

    POSTS {
        uuid id PK
        varchar title
        text content
        varchar status
        integer reading_time
        uuid author_id FK
        uuid category_id FK
        timestamp created_at
        timestamp updated_at
    }

    POST_TAGS {
        uuid post_id PK, FK
        uuid tag_id PK, FK
    }
```

## Ownership and deletion behavior

```mermaid
flowchart TB
    User[User] -->|cascade all + orphan removal| Posts[Authored posts]
    Category[Category] -->|referenced by| Posts
    Tags[Tags] -->|many-to-many| Join[post_tags]
    Posts --> Join

    DeleteUser[Delete user] --> DeletePosts[Associated posts are deleted]
    DeleteCategory[Delete category] --> CategoryGuard{Any associated posts?}
    CategoryGuard -->|Yes| RejectCategory[Reject deletion]
    CategoryGuard -->|No| RemoveCategory[Delete category]
    DeleteTag[Delete tag] --> TagGuard{Any associated posts?}
    TagGuard -->|Yes| RejectTag[409 Conflict]
    TagGuard -->|No| RemoveTag[Delete tag]
```

The category and tag guards are application-service rules. The current category service returns success without deletion when the ID does not exist; the tag service behaves similarly.

## Post lifecycle

The status enum has two values and no review, archived, or scheduled state.

```mermaid
stateDiagram-v2
    [*] --> DRAFT: Create as draft
    [*] --> PUBLISHED: Create as published
    DRAFT --> PUBLISHED: Update status
    PUBLISHED --> DRAFT: Unpublish
    DRAFT --> [*]: Delete
    PUBLISHED --> [*]: Delete

    note right of DRAFT
        Returned by /posts/drafts
        for the authenticated author
    end note

    note right of PUBLISHED
        Returned by public list and
        category/tag filter queries
    end note
```

`GET /posts/{id}` loads by ID without checking status, so both states are currently retrievable through that public route if the UUID is known.

## Persistence lifecycle

```mermaid
sequenceDiagram
    participant Service
    participant Entity as Post entity
    participant JPA as Hibernate / JPA
    participant DB as PostgreSQL

    Service->>Entity: Set title, content, status, author, category, tags
    Service->>Entity: Calculate readingTime
    Service->>JPA: save(post)
    JPA->>Entity: @PrePersist onCreate()
    Entity->>Entity: createdAt = updatedAt = now
    JPA->>DB: INSERT posts + post_tags
    DB-->>Service: Persisted post

    Service->>Entity: Apply later changes
    Service->>JPA: save(existingPost)
    JPA->>Entity: @PreUpdate onUpdate()
    Entity->>Entity: updatedAt = now
    JPA->>DB: UPDATE posts and join rows
```

## Entity-to-API mapping

Entities remain inside the backend. Controllers expose DTOs generated through MapStruct.

```mermaid
flowchart LR
    subgraph Persistence[JPA entities]
        UserEntity[User]
        PostEntity[Post]
        CategoryEntity[Category]
        TagEntity[Tag]
    end

    subgraph Mapping[MapStruct]
        PostMapper
        CategoryMapper
        TagMapper
    end

    subgraph API[Response DTOs]
        PostDto
        AuthorDto
        CategoryDto
        TagDto
    end

    PostEntity --> PostMapper --> PostDto
    UserEntity --> PostMapper --> AuthorDto
    CategoryEntity --> CategoryMapper --> CategoryDto
    TagEntity --> TagMapper --> TagDto
    CategoryEntity -. nested mapping .-> PostMapper
    TagEntity -. nested mapping .-> PostMapper
    CategoryMapper -->|published post count| CategoryDto
    TagMapper -->|published post count| TagDto
```

`PostDto` contains nested author, category, and tag representations. Passwords and the user's email are not included in post responses.

## Request models

```mermaid
flowchart LR
    CreateDto[CreatePostRequestDto] --> PostMapper
    UpdateDto[UpdatePostRequestDto] --> PostMapper
    PostMapper --> CreateDomain[CreatePostRequest]
    PostMapper --> UpdateDomain[UpdatePostRequest]
    CreateDomain --> PostService
    UpdateDomain --> PostService
    PostService --> PostEntity[Post entity]
```

The create and update models carry title, content, category ID, tag IDs, and status. The update DTO also requires an `id`, although the service selects the post using the route ID.

## Integrity and schema-management notes

- UUID primary keys are generated by Hibernate.
- Email, category name, and tag name are unique database columns.
- Entity relationships require author and category foreign keys.
- `post_tags` uses a composite primary key of `(post_id, tag_id)`.
- Production currently uses `spring.jpa.hibernate.ddl-auto=update`.
- There are no versioned Flyway or Liquibase migrations.
- `Post.equals` and `hashCode` use mutable content and timestamps, which can make entity identity behavior surprising in sets or persistence contexts.
- Category and tag uniqueness handling differs: category creation checks case-insensitively, while tag lookup uses the submitted names directly.

See [ERD.md](ERD.md) for the compact relationship reference and [API.md](API.md) for serialized response shapes.
