package com.tls.edututor.board.board.service.impl;

import com.tls.edututor.board.answer.entity.Answer;
import com.tls.edututor.board.answer.repository.AnswerRepository;
import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.board.board.exception.BoardNotFoundException;
import com.tls.edututor.board.board.repository.BoardRepository;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.board.category.service.CategoryService;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 게시판 서비스의 구현체로, 게시판의 생성, 조회, 삭제 등의 비즈니스 로직을 처리합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

  private final CategoryService categoryService;
  private final BoardRepository boardRepository;
  private final AnswerRepository answerRepository;

  /**
   * {@inheritDoc}
   *
   * 게시판 요청 데이터를 바탕으로 새로운 게시판을 생성하고 저장합니다.
   *
   * @param request 게시판 생성 요청 데이터를 담고 있는 객체
   */
  @Override
  public void saveInquiry(BoardRequest request) {
    Board board = Board.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .category(categoryService.findById(3L))
            .build();
    boardRepository.save(board);
  }

  /**
   * {@inheritDoc}
   *
   * 특정 카테고리에 속한 게시판 목록을 검색합니다.
   *
   * @param categoryId      조회할 카테고리의 식별자
   * @param searchQuery     검색어 (선택 사항)
   * @param authentication  현재 인증된 사용자 정보
   * @return 요청한 카테고리에 속하는 게시판 목록
   */
  @Override
  public List<BoardResponse> getBoardsByCategory(Long categoryId, String searchQuery, Authentication authentication) {
    return convertBoardsToResponses(getBoards(categoryId, searchQuery, false), authentication);
  }

  /**
   * {@inheritDoc}
   *
   * 특정 카테고리와 하위 카테고리에 속한 게시판 목록을 검색합니다.
   *
   * @param categoryId      조회할 카테고리의 식별자
   * @param searchQuery     검색어 (선택 사항)
   * @param authentication  현재 인증된 사용자 정보
   * @return 요청한 카테고리 및 하위 카테고리에 속하는 게시판 목록
   */
  @Override
  public List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId, String searchQuery, Authentication authentication) {
    return convertBoardsToResponses(getBoards(categoryId, searchQuery, true), authentication);
  }

  /**
   * 카테고리 ID와 검색 조건에 따라 게시판 목록을 조회합니다.
   *
   * @param categoryId      조회할 카테고리의 식별자
   * @param searchQuery     검색어 (선택 사항)
   * @param includeChildren 하위 카테고리를 포함할지 여부
   * @return 조회된 게시판 엔티티 목록
   */
  private List<Board> getBoards(Long categoryId, String searchQuery, boolean includeChildren) {
    if (StringUtils.hasText(searchQuery)) {
      return includeChildren ?
              boardRepository.findByCategoryIdIncludingChildrenAndSearch(categoryId, searchQuery) :
              boardRepository.findByCategoryIdAndSearch(categoryId, searchQuery);
    }
    return includeChildren ?
            boardRepository.findByCategoryIdIncludingChildren(categoryId) :
            boardRepository.findByCategoryIdOrderByIdDesc(categoryId);
  }

  /**
   * 게시판 엔티티 목록을 사용자 인증 정보를 포함한 응답 객체 목록으로 변환합니다.
   *
   * @param boards          변환할 게시판 엔티티 목록
   * @param authentication  현재 인증된 사용자 정보
   * @return 변환된 게시판 응답 객체 목록
   */
  private List<BoardResponse> convertBoardsToResponses(List<Board> boards, Authentication authentication) {
    List<BoardResponse> boardResponses = new ArrayList<>();
    String username = authentication != null ? ((AuthUser) authentication.getPrincipal()).getUsername() : "";
    for (Board board : boards) {
      Answer answer = answerRepository.findByBoardId(board.getId());
      boardResponses.add(BoardResponse.from(board, username, answer));
    }
    return boardResponses;
  }

  /**
   * {@inheritDoc}
   *
   * 특정 게시판을 삭제합니다. 삭제 전에 게시판의 존재 여부를 확인합니다.
   *
   * @param boardId 삭제할 게시판의 식별자
   */
  @Override
  public void deleteInquiry(Long boardId) {
    validateBoardExists(boardId);
    boardRepository.deleteById(boardId);
  }

  /**
   * 특정 게시판이 데이터베이스에 존재하는지 확인합니다.
   *
   * @param boardId 확인할 게시판의 식별자
   * @throws BoardNotFoundException 게시판이 존재하지 않을 경우 예외를 발생시킵니다.
   */
  private void validateBoardExists(Long boardId) {
    if (!boardRepository.existsById(boardId)) {
      throw new BoardNotFoundException("게시판이 존재하지 않습니다. ID: " + boardId);
    }
  }
}
