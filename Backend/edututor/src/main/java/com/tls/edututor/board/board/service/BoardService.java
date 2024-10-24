package com.tls.edututor.board.board.service;

import com.tls.edututor.board.board.dto.response.BoardResponse;

import java.util.List;

public interface BoardService {
  List<BoardResponse> getBoardsByCategory(Long categoryId);
  List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId);
}
