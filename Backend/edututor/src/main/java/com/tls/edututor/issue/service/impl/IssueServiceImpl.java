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

/**
 * 사용자 신고 관련 서비스의 구현체입니다.
 * 이 클래스는 신고 등록, 조회, 상태 업데이트 등의 기능을 제공합니다.
 */
@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

  private final IssueRepository issueRepository;
  private final QuestionRepository questionRepository;

  /**
   * 모든 신고 목록을 조회하는 메서드입니다.
   *
   * @return 최근 등록된 신고들의 목록
   */
  @Override
  public List<IssueResponse> getAllIssues() {
    return issueRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
            .map(issue -> new IssueResponse(
                    issue.getId(),
                    issue.getQuestion() != null ? issue.getQuestion().getId() : null,
                    issue.getContent(),
                    issue.getStatus(),
                    issue.getCreatedAt()
            ))
            .collect(Collectors.toList());
  }

  /**
   * 사용자가 신고를 등록하는 메서드입니다.
   *
   * @param request 신고 등록 요청 정보
   * @param authentication 신고를 등록하는 사용자 인증 정보
   * @throws IllegalArgumentException questionId가 제공되지 않은 경우 예외 발생
   */
  @Transactional
  @Override
  public void reportIssue(IssueRegisterRequest request, Authentication authentication) {
    Issue issue = new Issue();

    if (request.getQuestionId() != null) {
      issue.setQuestion(questionRepository.getReferenceById(request.getQuestionId()));
    } else {
      throw new IllegalArgumentException("Question ID is required for reporting an issue.");
    }

    issue.setWriter(((AuthUser) authentication.getPrincipal()).getId());
    issue.setContent(request.getContent());
    issue.setStatus(0L); // 신고 초기 상태
    issue.setCreatedAt(LocalDateTime.now());
    issue.setIsDeleted(false);
    issueRepository.save(issue);
  }

  /**
   * 특정 신고의 상세 정보를 조회하는 메서드입니다.
   *
   * @param issueId 조회할 신고의 ID
   * @return 해당 신고의 상세 정보
   * @throws IllegalArgumentException 해당 ID로 조회되는 신고가 없을 경우 예외 발생
   */
  @Override
  public IssueDetailResponse getIssueDetails(Long issueId) {
    Issue issue = issueRepository.findById(issueId)
            .orElseThrow(() -> new IllegalArgumentException("해당 신고가 존재하지 않습니다."));

    List<IssueOptionResponse> options = issue.getQuestion() != null ? issue.getQuestion().getOptions().stream()
            .map(option -> new IssueOptionResponse(option.getId(), option.getContent()))
            .collect(Collectors.toList()) : List.of();

    return new IssueDetailResponse(
            issue.getId(),
            issue.getQuestion() != null ? issue.getQuestion().getId() : null,
            issue.getContent(),
            issue.getStatus(),
            issue.getReason(),
            issue.getCreatedAt(),
            issue.getQuestion() != null ? issue.getQuestion().getContent() : null,
            options
    );
  }

  /**
   * 신고의 상태를 업데이트하는 메서드입니다.
   *
   * @param request 신고 상태 업데이트 요청 정보
   * @throws RuntimeException 해당 ID로 조회되는 신고가 없을 경우 예외 발생
   */
  @Transactional
  @Override
  public void updateIssueStatus(IssueStatusUpdateRequest request) {
    Issue issue = issueRepository.findById(request.getIssueId())
            .orElseThrow(() -> new RuntimeException("해당 신고가 존재하지 않습니다."));
    issue.setStatus(request.getStatus());
    issue.setReason(request.getReason());
    issueRepository.save(issue);
  }
}
