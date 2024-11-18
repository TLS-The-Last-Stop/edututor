package com.tls.edututor.issue.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.dto.request.IssueStatusUpdateRequest;
import com.tls.edututor.issue.dto.response.IssueDetailResponse;
import com.tls.edututor.issue.dto.response.IssueResponse;
import com.tls.edututor.issue.service.IssueService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 신고 관련 API를 처리하는 컨트롤러입니다.
 * 사용자는 이 컨트롤러를 통해 신고를 등록하고, 상태를 업데이트하며,
 * 신고 목록 및 상세 정보를 조회할 수 있습니다.
 */
@RestController
@RequestMapping("/issue")
public class IssueController {

  private final IssueService issueService;

  /**
   * IssueController의 생성자입니다.
   *
   * @param issueService 신고 관련 서비스
   */
  public IssueController(IssueService issueService) {
    this.issueService = issueService;
  }

  /**
   * 특정 신고의 상세 정보를 조회하는 API입니다.
   *
   * @param issueId 조회할 신고의 ID
   * @return 신고의 상세 정보
   */
  @GetMapping("/details/{issueId}")
  public CommonApiResponse<IssueDetailResponse> getIssueDetails(@PathVariable Long issueId) {
    IssueDetailResponse issueDetails = issueService.getIssueDetails(issueId);
    return CommonApiResponse.createSuccess("신고 조회 성공", issueDetails);
  }

  /**
   * 모든 신고 목록을 조회하는 API입니다.
   *
   * @return 모든 신고에 대한 정보를 담고 있는 리스트
   */
  @GetMapping("/list")
  public CommonApiResponse<List<IssueResponse>> getAllIssues() {
    List<IssueResponse> issues = issueService.getAllIssues();
    return CommonApiResponse.createSuccess("신고 리스트 조회 성공", issues);
  }

  /**
   * 사용자가 신고를 등록하는 API입니다.
   *
   * @param request 신고 등록 요청 정보
   * @param authentication 현재 인증된 사용자 정보
   * @return 신고 완료 메시지
   */
  @PostMapping("/report")
  public CommonApiResponse<Void> reportIssue(@RequestBody IssueRegisterRequest request, Authentication authentication) {
    issueService.reportIssue(request, authentication);
    return CommonApiResponse.createSuccessWithNoContent("신고 완료!");
  }

  /**
   * 신고 상태를 업데이트하는 API입니다.
   *
   * @param request 신고 상태 업데이트 요청 정보
   * @return 신고 상태 업데이트 완료 메시지
   */
  @PutMapping("/update-status")
  public CommonApiResponse<Void> updateIssueStatus(@RequestBody IssueStatusUpdateRequest request) {
    issueService.updateIssueStatus(request);
    return CommonApiResponse.createSuccessWithNoContent("신고 상태가 업데이트되었습니다.");
  }

}
