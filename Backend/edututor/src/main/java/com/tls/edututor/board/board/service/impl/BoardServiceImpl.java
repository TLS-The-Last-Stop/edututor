package com.tls.edututor.board.board.service.impl;

import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.board.board.repository.BoardRepository;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.board.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;
  private final CategoryRepository categoryRepository;
  private static final Long INQUIRY_CATEGORY_ID = 3L;

  // 특정 카테고리의 게시글만 조회
  @Override
  public List<BoardResponse> getBoardsByCategory(Long categoryId) {
    List<Board> boards = boardRepository.findByCategoryId(categoryId);
    List<BoardResponse> boardResponses = new ArrayList<>();
    for(Board board : boards) {
      boardResponses.add(BoardResponse.dto(board));
    }
    return boardResponses;
  }

  // 하위 카테고리 게시글 포함 조회
  @Override
  public List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId) {
    List<Board> boards = boardRepository.findByCategoryIdIncludingChildren(categoryId);
    List<BoardResponse> boardResponses = new ArrayList<>();
    for (Board board : boards) {
      boardResponses.add(BoardResponse.dto(board));
    }
    return boardResponses;
  }

  @Override
  public void saveInquiry(BoardRequest request){
    Category inquiryCategory = categoryRepository.findById(INQUIRY_CATEGORY_ID)
            .orElseThrow(() -> new IllegalStateException("1:1 문의 카테고리 찾지 못함"));

      Board board = new Board();
      board.setTitle(request.getTitle());
      board.setContent(request.getContent());
      board.setCategory(inquiryCategory);

      boardRepository.save(board);
  }

  @Override
  public void deleteInquiry(Long boardId) {
      boardRepository.deleteById(boardId);
  }
}