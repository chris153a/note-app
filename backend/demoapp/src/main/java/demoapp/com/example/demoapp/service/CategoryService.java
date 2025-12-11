package demoapp.com.example.demoapp.service;

import java.util.List;
import demoapp.com.example.demoapp.model.Category;

public interface CategoryService {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    void deleteCategory(Long id);
}