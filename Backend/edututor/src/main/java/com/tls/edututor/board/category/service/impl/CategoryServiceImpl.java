package com.tls.edututor.board.category.service.impl;

import com.tls.edututor.board.category.dto.CategoryResult;
import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.board.category.repository.CategoryRepository;
import com.tls.edututor.board.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository categoryRepository;

  public List<CategoryResult> findAll() {
    try {
      List<Category> categories = categoryRepository.findAllCategoryByParentIdAscNullsFirstCategoryIdAsc();
      log.info("Found {} categories", categories.size());

      if (categories.isEmpty()) {
        log.warn("No categories found in the database");
      }

      return CategoryResult.resultList(categories);
    } catch (Exception e) {
      log.error("Error in findAll()", e);
      throw e;
    }
  }
}
