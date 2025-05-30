package me.nayanm.blog.services;

import me.nayanm.blog.domain.CreatePostRequest;
import me.nayanm.blog.domain.entities.Post;
import me.nayanm.blog.domain.entities.User;

import java.util.List;
import java.util.UUID;

public interface PostService {
    List<Post> getAllPosts(UUID categoryId, UUID tagId);
    List<Post> getDraftPosts(User user);
    Post createPost(User user, CreatePostRequest createPostRequest);
}
