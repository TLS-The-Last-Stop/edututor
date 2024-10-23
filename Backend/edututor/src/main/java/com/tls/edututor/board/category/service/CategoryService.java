package com.tls.edututor.board.category.service;

import com.tls.edututor.board.category.dto.CategoryResult;

import java.util.List;

public interface CategoryService {
  List<CategoryResult> findAll();
}