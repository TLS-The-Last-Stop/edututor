package com.tls.edututor.exam.usertest.service;

import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;
import org.springframework.security.core.Authentication;

/**
 * 사용자 시험 관련 서비스 인터페이스입니다.
 * 사용자가 시험지를 조회하고, 시험 제출 및 채점하는 기능을 제공합니다.
 */
public interface UserTestService {

  /**
   * 주어진 시험지 ID에 해당하는 시험지를 조회하는 메서드입니다.
   *
   * @param testPaperId 조회할 시험지의 ID
   * @return 학생용 시험지 응답 객체
   * @throws IllegalArgumentException 주어진 시험지를 찾을 수 없는 경우
   */
  StudentTestPaperResponse getTestPaper(Long testPaperId);

  /**
   * 사용자가 제출한 답안을 채점하고, 결과를 저장하는 메서드입니다.
   *
   * @param userTestRequest 사용자 답안 요청 객체
   * @param authentication 인증된 사용자 정보
   * @throws IllegalArgumentException 주어진 시험지에 대한 ShareTest 엔티티를 찾을 수 없는 경우
   */
  void submitAndGradeUserTest(UserTestRequest userTestRequest, Authentication authentication);
}
