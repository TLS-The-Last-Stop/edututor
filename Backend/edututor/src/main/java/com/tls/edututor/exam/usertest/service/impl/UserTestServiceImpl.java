package com.tls.edututor.exam.usertest.service.impl;

import com.tls.edututor.exam.option.entity.Option;
import com.tls.edututor.exam.option.repository.OptionRepository;
import com.tls.edututor.exam.question.dto.response.TestQuestionResponse;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.useransewer.dto.request.UserAnswerRequest;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import com.tls.edututor.exam.usertest.service.UserTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserTestServiceImpl implements UserTestService {

  private final TestPaperRepository testPaperRepository;
  private final UserTestRepository userTestRepository;
  private final OptionRepository optionRepository;
  private final UserAnswerRepository userAnswerRepository;
  private final QuestionRepository questionRepository;

  @Override
  public StudentTestPaperResponse getTestPaper(Long testPaperId) {
    TestPaper testPaper = testPaperRepository.findById(testPaperId)
            .orElseThrow(() -> new IllegalArgumentException("시험지를 찾을 수 없습니다. ID: " + testPaperId));
    List<TestQuestionResponse> questionResponses = testPaper.getQuestions().stream()
            .map(TestQuestionResponse::new)
            .toList();
    return new StudentTestPaperResponse(testPaper.getId(), testPaper.getTitle(), questionResponses);
  }

  @Override
  @Transactional
  public void submitAndGradeUserTest(UserTestRequest userTestRequest) {
    UserTest userTest = new UserTest();
    userTest.setExamTaken(true);
    userTestRepository.save(userTest);

    double correctCount = 0;
    for (UserAnswerRequest answerRequest : userTestRequest.getAnswers()) {
      Question question = questionRepository.findById(answerRequest.getQuestionId())
              .orElseThrow(() -> new IllegalArgumentException("Invalid question ID"));

      UserAnswer userAnswer = new UserAnswer();
      userAnswer.setUserTest(userTest);
      userAnswer.setQuestion(question);
      userAnswer.setAnswer(answerRequest.getAnswer());
      userAnswer.setSubmittedAt(LocalDateTime.now());

      if (question.getType().equals("OBJECTIVE")) {
        Option selectedOption = optionRepository.findById(Long.parseLong(answerRequest.getAnswer()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid option ID"));
        boolean isCorrect = Boolean.TRUE.equals(selectedOption.getIsCorrect());
        userAnswer.setIsCorrect(isCorrect);
        if (isCorrect) correctCount++;
      } else if (question.getType().equals("SUBJECTIVE")) {
        userAnswer.setIsCorrect(evaluateSubjectiveAnswer(answerRequest.getAnswer(), question));
        if (userAnswer.getIsCorrect()) correctCount++;
      }

      userAnswerRepository.save(userAnswer);
    }

    userTest.setResult((correctCount / userTestRequest.getAnswers().size()) * 100);
    userTestRepository.save(userTest);
  }

  private boolean evaluateSubjectiveAnswer(String answer, Question question) {
    // 주관식 답변 채점 로직 (필요 시 추가)
    return true;
  }
}