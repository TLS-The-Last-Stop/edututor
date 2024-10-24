package com.tls.edututor.board.category.controller;

import com.tls.edututor.board.category.dto.CategoryResult;
import com.tls.edututor.board.category.service.CategoryService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {
  private final CategoryService categoryService;

  @GetMapping("/categories")
  public CommonApiResponse<List<CategoryResult>> getCategories() {
    List<CategoryResult> list = categoryService.findAll();
    return CommonApiResponse.createCreated("list", list);
  }
}