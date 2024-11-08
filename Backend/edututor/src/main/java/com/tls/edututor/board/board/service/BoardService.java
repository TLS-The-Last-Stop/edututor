package com.tls.edututor.board.board.service;

import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface BoardService {
  List<BoardResponse> getBoardsByCategory(Long categoryId, String searchQuery, Authentication authentication);

  List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId, String searchQuery, Authentication authentication);

  void saveInquiry(BoardRequest request);

  void deleteInquiry(Long boardId);
}
