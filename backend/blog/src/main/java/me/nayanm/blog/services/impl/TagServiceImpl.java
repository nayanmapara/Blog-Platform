package me.nayanm.blog.services.impl;

import lombok.RequiredArgsConstructor;
import me.nayanm.blog.domain.entities.Tag;
import me.nayanm.blog.repositories.TagRepository;
import me.nayanm.blog.services.TagService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAllWithPostCount();
    }
}
