package com.tls.edututor.board.board.controller;

import com.tls.edututor.board.board.dto.response.BoardResponse;
import com.tls.edututor.board.board.service.BoardService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
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
    try {
      List<BoardResponse> boards = includeChildren ?
              boardService.getBoardsByCategoryWithChildren(categoryId) :
              boardService.getBoardsByCategory(categoryId);

      return CommonApiResponse.createSuccess("board", boards);
    } catch (Exception e) {
      log.error("@@@@@@@@@@@@@@@@@@", categoryId, e);
      return CommonApiResponse.createError("게시글 조회 중 오류가 발생했습니다.");
    }
  }

}