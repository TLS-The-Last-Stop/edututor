package com.tls.edututor.issue.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
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

  @GetMapping("/list")
  public CommonApiResponse<List<Issue>> getAllIssues() {
    List<Issue> issues = issueService.getAllIssues();
    return CommonApiResponse.createSuccess("신고 리스트 조회 성공", issues);
  }

  @PostMapping("/report")
  public CommonApiResponse<Void> reportIssue(@RequestBody IssueRegisterRequest request, Authentication authentication) {
    issueService.reportIssue(request, authentication);
    return CommonApiResponse.createSuccessWithNoContent("신고 완료!");
  }

}
