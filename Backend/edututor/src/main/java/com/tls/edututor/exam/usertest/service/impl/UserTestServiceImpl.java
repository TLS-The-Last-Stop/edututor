package com.tls.edututor.exam.usertest.service.impl;

import com.tls.edututor.exam.option.entity.Option;
import com.tls.edututor.exam.option.repository.OptionRepository;
import com.tls.edututor.exam.question.dto.response.TestQuestionResponse;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.entity.QuestionType;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
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
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
  private final ShareTestRepository shareTestRepository;

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
  public void submitAndGradeUserTest(UserTestRequest userTestRequest, Authentication authentication) {
    ShareTest shareTest = shareTestRepository.findByUserIdAndTestPaperId(((AuthUser) authentication.getPrincipal()).getId(), userTestRequest.getTestPaperId())
              .orElseThrow(() -> new IllegalArgumentException("ShareTest 엔티티를 찾을 수 없습니다."));

    UserTest userTest = new UserTest();
    userTest.setExamTaken(true);
    userTest.setShareTest(shareTest);
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

      if (question.getType().equals(QuestionType.OBJECTIVE)) {
        Option selectedOption = optionRepository.findById(Long.parseLong(answerRequest.getAnswer()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid option ID"));
        boolean isCorrect = Boolean.TRUE.equals(selectedOption.getIsCorrect());
        userAnswer.setIsCorrect(isCorrect);
        if (isCorrect) correctCount++;
      } else if (question.getType().equals(QuestionType.SUBJECTIVE)) {
        userAnswer.setIsCorrect(evaluateSubjectiveAnswer(answerRequest.getAnswer(), question));
        if (userAnswer.getIsCorrect()) correctCount++;
      }

      userAnswerRepository.save(userAnswer);
    }

    double score = (correctCount / userTestRequest.getAnswers().size()) * 100;
    userTest.setResult(score);
    userTestRepository.save(userTest);
  }

  private boolean evaluateSubjectiveAnswer(String answer, Question question) {
    return true;
  }
}