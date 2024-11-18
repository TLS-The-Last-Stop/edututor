package com.tls.edututor.board.board.controller;

import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 게시판 관리 API를 제공하는 컨트롤러입니다.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/cmmn")
public class BoardController {

  private final BoardService boardService;

  /**
   * 카테고리에 따라 게시판 목록을 조회합니다.
   *
   * @param categoryId      조회할 카테고리의 식별자
   * @param includeChildren 하위 카테고리 포함 여부
   * @param searchQuery     검색어 (선택 사항)
   * @param authentication  현재 인증된 사용자 정보
   * @return 요청한 카테고리에 속하는 게시판 목록
   */
  @GetMapping("/{categoryId}")
  public CommonApiResponse<List<BoardResponse>> getBoardsByCategory(@PathVariable Long categoryId,
                                                                    @RequestParam(required = false, defaultValue = "false") boolean includeChildren,
                                                                    @RequestParam(required = false) String searchQuery,
                                                                    Authentication authentication) {
    List<BoardResponse> boards = includeChildren ?
            boardService.getBoardsByCategoryWithChildren(categoryId, searchQuery, authentication) :
            boardService.getBoardsByCategory(categoryId, searchQuery, authentication);
    return CommonApiResponse.createSuccess("게시판 리스트", boards);
  }

  /**
   * 새 게시판을 생성합니다.
   *
   * @param request 게시판 생성 요청 데이터를 담고 있는 객체
   * @return 성공 응답
   */
  @PostMapping("/inquiry/create")
  public CommonApiResponse<Void> createBoard(@RequestBody BoardRequest request) {
    boardService.saveInquiry(request);
    return CommonApiResponse.createSuccessWithNoContent("게시판 등록 성공");
  }

  /**
   * 특정 게시판을 삭제합니다.
   *
   * @param boardId 삭제할 게시판의 식별자
   * @return 성공 응답
   */
  @DeleteMapping("/inquiry/delete/{boardId}")
  public CommonApiResponse<Void> deleteBoard(@PathVariable Long boardId) {
    boardService.deleteInquiry(boardId);
    return CommonApiResponse.createSuccessWithNoContent("게시판 삭제 성공");
  }
}
