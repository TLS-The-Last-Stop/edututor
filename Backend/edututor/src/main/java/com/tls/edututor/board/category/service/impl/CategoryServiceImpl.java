package com.tls.edututor.board.category.service.impl;

import com.tls.edututor.board.category.dto.CategoryResult;
import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.board.category.repository.CategoryRepository;
import com.tls.edututor.board.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 카테고리 서비스의 구현체로, 카테고리와 관련된 비즈니스 로직을 처리합니다.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  /**
   * {@inheritDoc}
   * <p>
   * 주어진 카테고리 ID로 카테고리를 조회합니다.
   *
   * @param categoryId 조회할 카테고리의 식별자
   * @return 조회된 카테고리 엔티티
   * @throws IllegalStateException 카테고리가 존재하지 않을 경우 발생
   */
  @Override
  public Category findById(Long categoryId) {
    return categoryRepository.findById(categoryId)
            .orElseThrow(() -> new IllegalStateException("카테고리를 찾을 수 없습니다. ID: " + categoryId));
  }

  /**
   * 모든 카테고리를 조회합니다.
   * 부모 ID를 기준으로 정렬하며, 부모가 없는 경우 우선적으로 정렬합니다.
   *
   * @return 카테고리 목록 DTO
   * @throws Exception 조회 중 오류가 발생할 경우 예외를 발생
   */
  @Override
  public List<CategoryResult> findAll() {
    try {
      List<Category> categories = categoryRepository.findAllCategoryByParentIdAscNullsFirstCategoryIdAsc();
      return CategoryResult.resultList(categories);
    } catch (Exception e) {
      log.error("카테고리 조회 중 오류 발생", e);
      throw e;
    }
  }
}