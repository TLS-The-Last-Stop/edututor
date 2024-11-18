package com.tls.edututor.issue.service;

import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.dto.request.IssueStatusUpdateRequest;
import com.tls.edututor.issue.dto.response.IssueDetailResponse;
import com.tls.edututor.issue.dto.response.IssueResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

/**
 * 사용자 신고 관련 서비스 인터페이스입니다.
 * 사용자는 이 서비스를 통해 신고를 등록하거나 상태를 업데이트하며,
 * 신고의 상세 정보를 조회할 수 있습니다.
 */
public interface IssueService {

  /**
   * 사용자가 신고를 등록하는 메서드입니다.
   *
   * @param request 신고 등록 요청 정보
   * @param authentication 현재 인증된 사용자 정보
   */
  void reportIssue(IssueRegisterRequest request, Authentication authentication);

  /**
   * 모든 신고의 목록을 조회하는 메서드입니다.
   *
   * @return 모든 신고에 대한 정보를 담고 있는 리스트
   */
  List<IssueResponse> getAllIssues();

  /**
   * 신고의 상태를 업데이트하는 메서드입니다.
   *
   * @param request 신고 상태 업데이트 요청 정보
   */
  void updateIssueStatus(IssueStatusUpdateRequest request);

  /**
   * 특정 신고에 대한 상세 정보를 조회하는 메서드입니다.
   *
   * @param issueId 조회할 신고의 ID
   * @return 해당 신고의 상세 정보
   */
  IssueDetailResponse getIssueDetails(Long issueId);
}
