package com.tls.edututor.issue.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.dto.request.IssueStatusUpdateRequest;
import com.tls.edututor.issue.dto.response.IssueDetailResponse;
import com.tls.edututor.issue.dto.response.IssueResponse;
import com.tls.edututor.issue.entity.Issue;
import com.tls.edututor.issue.service.IssueService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issue")
public class IssueController {

  private final IssueService issueService;

  public IssueController(IssueService issueService) {
    this.issueService = issueService;
  }

  @GetMapping("/details/{issueId}")
  public CommonApiResponse<IssueDetailResponse> getIssueDetails(@PathVariable Long issueId) {
    IssueDetailResponse issueDetails = issueService.getIssueDetails(issueId);
    return CommonApiResponse.createSuccess("신고 조회 성공", issueDetails);
  }

  @GetMapping("/list")
  public CommonApiResponse<List<IssueResponse>> getAllIssues() {
    List<IssueResponse> issues = issueService.getAllIssues();
    return CommonApiResponse.createSuccess("신고 리스트 조회 성공", issues);
  }

  @PostMapping("/report")
  public CommonApiResponse<Void> reportIssue(@RequestBody IssueRegisterRequest request, Authentication authentication) {
    issueService.reportIssue(request, authentication);
    return CommonApiResponse.createSuccessWithNoContent("신고 완료!");
  }

  @PutMapping("/update-status")
  public CommonApiResponse<Void> updateIssueStatus(@RequestBody IssueStatusUpdateRequest request) {
    issueService.updateIssueStatus(request);
    return CommonApiResponse.createSuccessWithNoContent("신고 상태가 업데이트되었습니다.");
  }

}
