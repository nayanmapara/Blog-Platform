package me.nayanm.blog.services;

import me.nayanm.blog.domain.entities.User;

import java.util.UUID;

public interface UserService {
    User getUserById(UUID id);
}
