# Entity Relationship Diagram (ERD)

This diagram illustrates the relationships between entities in the Blog Platform App.

![Blog Platform ERD](https://github.com/nayanmapara/Blog-Platform/blob/main/docs/images/blog-platform-erd.png)

## Entities and Relationships

- **User**: Can author multiple posts.
- **Post**: Belongs to one category and can have multiple tags.
- **Category**: Can contain multiple posts.
- **Tag**: Can be associated with multiple posts.

## Diagram Details

- **User** to **Post**: One-to-Many (A user can write many posts).
- **Post** to **Category**: Many-to-One (Each post belongs to one category).
- **Post** to **Tag**: Many-to-Many (Posts can have multiple tags, and tags can be associated with multiple posts).
