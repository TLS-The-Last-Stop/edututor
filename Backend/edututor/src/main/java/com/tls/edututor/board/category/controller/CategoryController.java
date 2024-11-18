package com.tls.edututor.board.category.controller;

import com.tls.edututor.board.category.dto.CategoryResult;
import com.tls.edututor.board.category.service.CategoryService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 카테고리 목록을 반환하는 엔드포인트를 제공합니다.
 */
@RestController
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryService categoryService;

  /**
   * 모든 카테고리를 조회합니다.
   *
   * @return 카테고리 목록을 포함한 성공 응답 객체
   */
  @GetMapping("/categories")
  public CommonApiResponse<List<CategoryResult>> getCategories() {
    return CommonApiResponse.createSuccess("list", categoryService.findAll());
  }
}
