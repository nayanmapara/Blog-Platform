package me.nayanm.blog.services;

import me.nayanm.blog.domain.entities.Tag;

import java.util.List;

public interface TagService {
    List<Tag> getTags();
}
