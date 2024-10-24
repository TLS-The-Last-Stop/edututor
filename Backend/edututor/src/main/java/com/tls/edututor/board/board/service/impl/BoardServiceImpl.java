package com.tls.edututor.board.board.service.impl;

import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.board.board.repository.BoardRepository;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.board.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;
  private final CategoryRepository categoryRepository;

  // 특정 카테고리의 게시글만 조회
  public List<BoardResponse> getBoardsByCategory(Long categoryId) {
    List<Board> boards = boardRepository.findByCategoryId(categoryId);
    List<BoardResponse> boardResponses = new ArrayList<>();
    for(Board board : boards) {
      boardResponses.add(BoardResponse.dto(board));
    }
    return boardResponses;
  }

  // 하위 카테고리 게시글 포함 조회
  public List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId) {
    List<Board> boards = boardRepository.findByCategoryIdIncludingChildren(categoryId);
    List<BoardResponse> boardResponses = new ArrayList<>();
    for (Board board : boards) {
      boardResponses.add(BoardResponse.dto(board));
    }
    return boardResponses;
  }
}