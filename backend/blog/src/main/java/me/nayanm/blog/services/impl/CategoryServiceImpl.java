package me.nayanm.blog.services.impl;

import lombok.RequiredArgsConstructor;
import me.nayanm.blog.domain.entities.Category;
import me.nayanm.blog.repositories.CategoryRepository;
import me.nayanm.blog.services.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> listCategories() {
        return categoryRepository.findAll();
    }

}
