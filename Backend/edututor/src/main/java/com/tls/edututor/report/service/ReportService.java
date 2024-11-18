package com.tls.edututor.report.service;

import com.tls.edututor.report.dto.response.ShareTestResponse;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

/**
 * 시험지와 관련된 보고서 서비스 인터페이스입니다.
 * 이 서비스는 시험지 목록 조회, 상세 정보 조회, 공유된 시험지 목록 및 상세 정보 조회를 담당합니다.
 */
public interface ReportService {

  /**
   * 지정된 코스에 대한 시험지 목록을 페이지 형식으로 조회하는 메서드입니다.
   *
   * @param authentication 현재 인증된 사용자 정보
   * @param pageable 페이지네이션 정보 (페이지 번호, 크기 등)
   * @param courseId 조회할 코스의 ID
   * @return 해당 코스에 대한 시험지 목록을 포함하는 페이지 객체
   */
  Page<TestPaperResponse2> getTestPapers(Authentication authentication, Pageable pageable, Long courseId);

  /**
   * 특정 시험지의 상세 정보를 조회하는 메서드입니다.
   *
   * @param testPaperId 조회할 시험지의 ID
   * @return 지정된 시험지의 상세 정보를 담은 객체
   */
  TestPaperDetailResponse getTestPaperDetail(Long testPaperId);

  /**
   * 사용자가 공유한 시험지 목록을 페이지 형식으로 조회하는 메서드입니다.
   *
   * @param authentication 현재 인증된 사용자 정보
   * @param pageable 페이지네이션 정보 (페이지 번호, 크기 등)
   * @return 사용자가 공유한 시험지 목록을 포함하는 페이지 객체
   */
  Page<ShareTestResponse> getSharedTests(Authentication authentication, Pageable pageable);

  /**
   * 특정 시험지의 공유된 상세 정보를 조회하는 메서드입니다.
   *
   * @param testId 조회할 공유된 시험지의 ID
   * @return 지정된 공유된 시험지의 상세 정보를 담은 객체
   */
  ShareTestResponse getSharedTestDetail(Long testId);
}
