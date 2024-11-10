package com.tls.edututor.issue.service.impl;

import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.issue.dto.request.IssueRegisterRequest;
import com.tls.edututor.issue.dto.request.IssueStatusUpdateRequest;
import com.tls.edututor.issue.dto.response.IssueDetailResponse;
import com.tls.edututor.issue.dto.response.IssueOptionResponse;
import com.tls.edututor.issue.dto.response.IssueResponse;
import com.tls.edututor.issue.entity.Issue;
import com.tls.edututor.issue.repository.IssueRepository;
import com.tls.edututor.issue.service.IssueService;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

  private final IssueRepository issueRepository;
  private final QuestionRepository questionRepository;

  @Override
  public List<IssueResponse> getAllIssues() {
    return issueRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
            .map(issue -> new IssueResponse(
                    issue.getId(),
                    issue.getQuestion().getId(),
                    issue.getContent(),
                    issue.getStatus(),
                    issue.getCreatedAt()
            ))
            .collect(Collectors.toList());
  }

  @Transactional
  public void reportIssue(IssueRegisterRequest request, Authentication authentication) {
    Issue issue = new Issue();
    issue.setQuestion(questionRepository.getReferenceById(request.getQuestionId()));
    issue.setWriter(((AuthUser) authentication.getPrincipal()).getId());
    issue.setContent(request.getContent());
    issue.setStatus(0L);
    issue.setCreatedAt(LocalDateTime.now());
    issue.setIsDeleted(false);
    issueRepository.save(issue);
  }

  @Override
  public IssueDetailResponse getIssueDetails(Long issueId) {
    Issue issue = issueRepository.findById(issueId)
            .orElseThrow(() -> new IllegalArgumentException("해당 신고가 존재하지 않습니다."));

    List<IssueOptionResponse> options = issue.getQuestion().getOptions().stream()
            .map(option -> new IssueOptionResponse(option.getId(), option.getContent()))
            .collect(Collectors.toList());

    return new IssueDetailResponse(
            issue.getId(),
            issue.getQuestion().getId(),
            issue.getContent(),
            issue.getStatus(),
            issue.getReason(),
            issue.getCreatedAt(),
            issue.getQuestion().getContent(),
            options
    );
  }

  @Transactional
  public void updateIssueStatus(IssueStatusUpdateRequest request) {
    Issue issue = issueRepository.findById(request.getIssueId())
            .orElseThrow(() -> new RuntimeException("해당 신고가 존재하지 않습니다."));
    issue.setStatus(request.getStatus());
    issue.setReason(request.getReason());
    issueRepository.save(issue);
  }
}
