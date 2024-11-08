package com.tls.edututor.board.board.service.impl;

import com.tls.edututor.board.answer.entity.Answer;
import com.tls.edututor.board.answer.repository.AnswerRepository;
import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.board.board.repository.BoardRepository;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.board.category.repository.CategoryRepository;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {
  private final BoardRepository boardRepository;
  private final CategoryRepository categoryRepository;
  private final AnswerRepository answerRepository;
  private static final Long INQUIRY_CATEGORY_ID = 3L;

  // 특정 카테고리의 게시글만 조회
  @Override
  public List<BoardResponse> getBoardsByCategory(Long categoryId, String searchQuery, Authentication authentication) {
    List<Board> boards;
    log.info("Received searchQuery: '{}', hasText: {}", searchQuery, StringUtils.hasText(searchQuery));

    if (StringUtils.hasText(searchQuery)) {
      boards = boardRepository.findByCategoryIdAndSearch(categoryId, searchQuery);
    } else {
      boards = boardRepository.findByCategoryIdOrderByIdDesc(categoryId);
    }

    List<BoardResponse> boardResponses = new ArrayList<>();
    String username = ((AuthUser) authentication.getPrincipal()).getUsername();

    for (Board board : boards) {
      Answer answer = answerRepository.findByBoardId(board.getId());
      boardResponses.add(BoardResponse.dto(board, username, answer));
    }

    return boardResponses;
  }

  // 하위 카테고리 게시글 포함 조회
  @Override
  public List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId, String searchQuery, Authentication authentication) {
    List<Board> boards;
    if (StringUtils.hasText(searchQuery)) {
      boards = boardRepository.findByCategoryIdIncludingChildrenAndSearch(categoryId, searchQuery);
    } else {
      boards = boardRepository.findByCategoryIdIncludingChildren(categoryId);
    }

    List<BoardResponse> boardResponses = new ArrayList<>();
    String username = ((AuthUser) authentication.getPrincipal()).getUsername();
    for (Board board : boards) {
      Answer answer = answerRepository.findByBoardId(board.getId());
      boardResponses.add(BoardResponse.dto(board, username, answer));
    }

    return boardResponses;
  }

  @Override
  public void saveInquiry(BoardRequest request) {
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