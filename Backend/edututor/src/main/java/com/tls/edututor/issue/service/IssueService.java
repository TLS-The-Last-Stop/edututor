package com.tls.edututor.issue.service;

import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.entity.Issue;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IssueService {

  void reportIssue(IssueRegisterRequest request, Authentication authentication);

  List<Issue> getAllIssues();
}
