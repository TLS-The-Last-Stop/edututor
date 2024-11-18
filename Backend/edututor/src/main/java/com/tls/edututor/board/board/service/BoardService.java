package com.tls.edututor.board.board.service;

import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

/**
 * 게시판 관리와 관련된 주요 기능을 제공하는 서비스 인터페이스입니다.
 */
public interface BoardService {

  /**
   * 문의 게시판을 저장하는 메서드입니다.
   *
   * @param request 게시판 생성에 필요한 요청 데이터를 담고 있는 객체
   */
  void saveInquiry(BoardRequest request);

  /**
   * 특정 카테고리에 속한 게시판 목록을 검색하는 메서드입니다.
   *
   * @param categoryId      조회할 카테고리의 식별자
   * @param searchQuery     검색어 (선택 사항)
   * @param authentication  현재 인증된 사용자 정보
   * @return 요청한 카테고리에 속하는 게시판 목록
   */
  List<BoardResponse> getBoardsByCategory(Long categoryId, String searchQuery, Authentication authentication);

  /**
   * 특정 카테고리 및 하위 카테고리에 속한 게시판 목록을 검색하는 메서드입니다.
   *
   * @param categoryId      조회할 카테고리의 식별자
   * @param searchQuery     검색어 (선택 사항)
   * @param authentication  현재 인증된 사용자 정보
   * @return 요청한 카테고리 및 하위 카테고리에 속하는 게시판 목록
   */
  List<BoardResponse> getBoardsByCategoryWithChildren(Long categoryId, String searchQuery, Authentication authentication);

  /**
   * 특정 게시판을 삭제하는 메서드입니다.
   *
   * @param boardId 삭제할 게시판의 식별자
   */
  void deleteInquiry(Long boardId);
}
