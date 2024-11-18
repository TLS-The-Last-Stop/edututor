package com.tls.edututor.board.category.service;

import com.tls.edututor.board.category.dto.CategoryResult;
import com.tls.edututor.board.category.entity.Category;

import java.util.List;

/**
 * 카테고리와 관련된 비즈니스 로직을 정의하는 서비스 인터페이스입니다.
 */
public interface CategoryService {

  /**
   * 주어진 ID를 사용해 카테고리를 조회합니다.
   *
   * @param categoryId 조회할 카테고리의 식별자
   * @return 조회된 카테고리 엔티티
   */
  Category findById(Long categoryId);

  /**
   * 모든 카테고리를 조회합니다.
   *
   * @return 카테고리 목록 DTO
   */
  List<CategoryResult> findAll();
}
