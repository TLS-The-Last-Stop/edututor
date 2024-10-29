package com.tls.edututor.exam.exam.service.impl;

import com.tls.edututor.exam.exam.service.ExamService;
import com.tls.edututor.exam.question.dto.response.TestQuestionResponse;
import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.useransewer.dto.request.UserAnswerRequest;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

  private final TestPaperRepository testPaperRepository;
  private final UserAnswerRepository userAnswerRepository;
  private final UserTestRepository userTestRepository;
  private final UserRepository userRepository;
  private final QuestionRepository questionRepository;

  @Override
  public TestPaper getTestPaperById(Long testPaperId) {
    return testPaperRepository.findById(testPaperId)
            .orElseThrow(() -> new IllegalArgumentException("시험지를 찾을 수 없습니다. ID: " + testPaperId));
  }

  @Override
  public StudentTestPaperResponse convertToDTO(TestPaper testPaper) {
    List<TestQuestionResponse> questionResponses = testPaper.getQuestions().stream()
            .map(TestQuestionResponse::new)
            .toList();
    return new StudentTestPaperResponse(testPaper.getId(), testPaper.getTitle(), questionResponses);
  }

  @Override
  @Transactional
  public void submitUserAnswers(List<UserAnswerRequest> userAnswers) {

  }

  @Override
  @Transactional
  public void saveUserTestResult(UserTestRequest userTestRequest) {

  }
}
