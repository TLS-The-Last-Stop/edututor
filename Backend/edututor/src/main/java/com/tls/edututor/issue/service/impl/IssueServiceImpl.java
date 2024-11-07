package com.tls.edututor.issue.service.impl;

import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.entity.Issue;
import com.tls.edututor.issue.repository.IssueRepository;
import com.tls.edututor.issue.service.IssueService;
import com.tls.edututor.user.dto.response.AuthUser;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueServiceImpl implements IssueService {

  private final IssueRepository issueRepository;

  public IssueServiceImpl(IssueRepository issueRepository) {
    this.issueRepository = issueRepository;
  }

  public List<Issue> getAllIssues() {
    return issueRepository.findAll();
  }


  @Transactional
  public void reportIssue(IssueRegisterRequest request, Authentication authentication ) {
    Issue issue = new Issue();
    issue.setQuestionId(request.getQuestionId());
    issue.setWriter(((AuthUser) authentication.getPrincipal()).getId());
    issue.setContent(request.getContent());
    issue.setStatus(0L);
    issue.setCreatedAt(LocalDateTime.now());
    issue.setIsDeleted(false);
    issueRepository.save(issue);
  }
}
