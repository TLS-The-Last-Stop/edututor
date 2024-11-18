package com.tls.edututor.exam.testpaper.service;

import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;

/**
 * 시험지 관련 비즈니스 로직을 처리하는 서비스 인터페이스입니다.
 * 시험지 생성, 수정, 조회, 삭제 등의 기능을 제공합니다.
 */
public interface TestPaperService {

  /**
   * 새 시험지와 관련된 문제 및 옵션을 생성합니다.
   *
   * @param request 시험지 등록 요청 객체
   */
  void createTestPaperWithQuestionsAndOptions(TestPaperRegisterRequest request);

  /**
   * 시험지 ID에 해당하는 시험지를 조회합니다.
   *
   * @param id 조회할 시험지 ID
   * @return 시험지 조회 결과
   */
  TestPaperResponse getTestPaperById(Long id);

  /**
   * 기존 시험지 정보를 수정합니다.
   * 문제 및 옵션도 함께 수정할 수 있습니다.
   *
   * @param testPaperId 수정할 시험지 ID
   * @param request 시험지 수정 요청 객체
   */
  void updateTestPaper(Long testPaperId, TestPaperRegisterRequest request);

  /**
   * 시험지 ID에 해당하는 시험지를 삭제합니다.
   *
   * @param testPaperId 삭제할 시험지 ID
   */
  void deleteTestPaper(Long testPaperId);
}
