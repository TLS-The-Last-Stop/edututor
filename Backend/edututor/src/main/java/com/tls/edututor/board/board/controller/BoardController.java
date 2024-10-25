package com.tls.edututor.board.board.controller;

import com.tls.edututor.board.board.dto.request.BoardRequest;
import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cmmn")
public class BoardController {
  private final BoardService boardService;

  @GetMapping("/{categoryId}")
  public CommonApiResponse<List<BoardResponse>> getBoardsByCategory(
          @PathVariable Long categoryId,
          @RequestParam(required = false, defaultValue = "false") boolean includeChildren) {
    log.info("카테고리ID: {}, 하위카테고리포함: {}", categoryId, includeChildren);
    List<BoardResponse> boards = includeChildren ?
            boardService.getBoardsByCategoryWithChildren(categoryId) :
            boardService.getBoardsByCategory(categoryId);
    return CommonApiResponse.createSuccess("board", boards);
  }

  @PostMapping("/inquiry/create")
  public CommonApiResponse<Void> createBoard(@RequestBody BoardRequest request) {
    boardService.saveInquiry(request);
    return CommonApiResponse.createSuccessWithNoContent("게시판 등록 성공!");
  }

  @DeleteMapping("/inquiry/delete/{boardId}")
  public CommonApiResponse<Void> deleteBoard(@PathVariable Long boardId) {
    boardService.deleteInquiry(boardId);
    return CommonApiResponse.createSuccessWithNoContent("게시판 삭제 성공!");
  }
}