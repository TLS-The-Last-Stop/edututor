package com.tls.edututor.issue.service;

import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.dto.request.IssueStatusUpdateRequest;
import com.tls.edututor.issue.dto.response.IssueDetailResponse;
import com.tls.edututor.issue.dto.response.IssueResponse;
import com.tls.edututor.issue.entity.Issue;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IssueService {

  void reportIssue(IssueRegisterRequest request, Authentication authentication);

  List<IssueResponse> getAllIssues();

  void updateIssueStatus(IssueStatusUpdateRequest request);

  IssueDetailResponse getIssueDetails(Long issueId);
}
