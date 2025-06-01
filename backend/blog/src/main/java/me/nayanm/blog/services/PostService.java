package me.nayanm.blog.services;

import me.nayanm.blog.domain.CreatePostRequest;
import me.nayanm.blog.domain.UpdatePostRequest;
import me.nayanm.blog.domain.entities.Post;
import me.nayanm.blog.domain.entities.User;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.UUID;

public interface PostService {
    Post getPost(UUID id);
    List<Post> getAllPosts(UUID categoryId, UUID tagId);
    List<Post> getDraftPosts(User user);
    Post createPost(User user, CreatePostRequest createPostRequest);
    Post updatePost(UUID id, UpdatePostRequest updatePostRequest);
    void deletePost(UUID id);
}
