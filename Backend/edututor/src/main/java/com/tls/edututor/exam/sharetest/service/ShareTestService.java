package com.tls.edututor.exam.sharetest.service;

import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import org.springframework.security.core.Authentication;

/**
 * 시험지 공유 서비스 인터페이스입니다.
 *
 * 이 인터페이스는 시험지 공유와 관련된 비즈니스 로직을 정의합니다.
 */
public interface ShareTestService {

  /**
   * 시험지를 공유하는 메서드입니다.
   *
   * @param shareTestRequest 공유할 시험지의 정보
   * @param authentication 인증된 사용자 정보
   */
  void saveShareTest(ShareTestRequest shareTestRequest, Authentication authentication);

  /**
   * 시험지 공유를 취소하는 메서드입니다.
   *
   * @param shareTestRequest 취소할 시험지의 정보
   * @param authentication 인증된 사용자 정보
   */
  void deleteShareTest(ShareTestRequest shareTestRequest, Authentication authentication);
}
