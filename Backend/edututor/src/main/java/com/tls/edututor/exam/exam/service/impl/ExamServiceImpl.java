package com.tls.edututor.exam.exam.service.impl;

import com.tls.edututor.exam.exam.service.ExamService;
import com.tls.edututor.exam.option.dto.response.OptionResponse;
import com.tls.edututor.exam.question.dto.response.QuestionResponse;
import com.tls.edututor.exam.question.dto.response.TestQuestionResponse;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ExamServiceImpl implements ExamService {

  private final TestPaperRepository testPaperRepository;
  private final UserAnswerRepository userAnswerRepository;
  private final UserTestRepository userTestRepository;

  @Override
  public TestPaper getTestPaperById(Long testPaperId) {
    return testPaperRepository.findById(testPaperId)
            .orElseThrow(() -> new RuntimeException("시험지를 찾을 수 없습니다."));
  }

  @Override
  public void submitUserAnswers(List<UserAnswer> userAnswers) {
    userAnswerRepository.saveAll(userAnswers);
  }

  @Override
  public void saveUserTestResult(UserTest userTest) {
    userTestRepository.save(userTest);
  }

  @Override
  public TestPaperResponse convertToDTO(TestPaper testPaper) {
    List<QuestionResponse> questionDTOs = testPaper.getQuestions().stream()
            .map(question -> {
              List<OptionResponse> optionDTOs = question.getOptions().stream()
                      .map(option -> new OptionResponse(option.getId(), option.getContent(), null))
                      .collect(Collectors.toList());

              return new QuestionResponse(
                      question.getId(),
                      question.getContent(),
                      question.getType().toString(),
                      optionDTOs
              );
            })
            .collect(Collectors.toList());

    return new TestPaperResponse(
            testPaper.getId(),
            testPaper.getTitle(),
            questionDTOs
    );
  }
}

