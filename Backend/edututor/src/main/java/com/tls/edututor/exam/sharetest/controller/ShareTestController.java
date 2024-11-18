package com.tls.edututor.exam.sharetest.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import com.tls.edututor.exam.sharetest.service.ShareTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * 시험지 공유와 관련된 API를 처리하는 컨트롤러 클래스입니다.
 *
 * 이 클래스는 사용자 요청에 따라 시험지를 공유하거나 공유를 취소하는 기능을 제공합니다.
 */
@RestController
@RequiredArgsConstructor
public class ShareTestController {

  private final ShareTestService shareTestService;

  /**
   * 시험지를 공유하는 API입니다.
   *
   * @param shareTestRequest 공유할 시험지 정보
   * @param authentication 인증된 사용자 정보
   * @return 공유 성공 응답
   */
  @PostMapping("/tests/papers/{testPaper}")
  public CommonApiResponse<?> createShareTest(@RequestBody ShareTestRequest shareTestRequest, Authentication authentication) {
    shareTestService.saveShareTest(shareTestRequest, authentication);  // 시험지 공유 서비스 호출
    return CommonApiResponse.createNoContent("공유가 성공되었습니다.");  // 성공 응답 반환
  }

  /**
   * 시험지 공유를 취소하는 API입니다.
   *
   * @param shareTestRequest 공유 취소할 시험지 정보
   * @param authentication 인증된 사용자 정보
   * @return 공유 취소 성공 응답
   */
  @DeleteMapping("/tests/papers/{testPaper}")
  public CommonApiResponse<?> deleteShareTest(@RequestBody ShareTestRequest shareTestRequest, Authentication authentication) {
    shareTestService.deleteShareTest(shareTestRequest, authentication);  // 시험지 공유 취소 서비스 호출
    return CommonApiResponse.createNoContent("공유가 취소되었습니다.");  // 취소 성공 응답 반환
  }
}
