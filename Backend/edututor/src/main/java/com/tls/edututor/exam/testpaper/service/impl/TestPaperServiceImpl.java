package com.tls.edututor.exam.testpaper.service.impl;

import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import com.tls.edututor.exam.option.dto.request.OptionRegisterRequest;
import com.tls.edututor.exam.option.dto.response.OptionResponse;
import com.tls.edututor.exam.option.entity.Option;
import com.tls.edututor.exam.question.dto.request.QuestionRegisterRequest;
import com.tls.edututor.exam.question.dto.response.QuestionResponse;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.entity.QuestionType;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.testpaper.service.TestPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TestPaperServiceImpl implements TestPaperService {

  private final TestPaperRepository testPaperRepository;
  private final QuestionRepository questionRepository;
  private final UnitRepository unitRepository;

  @Override
  @Transactional
  public void createTestPaperWithQuestionsAndOptions(TestPaperRegisterRequest request) {
    Unit unit = unitRepository.findById(request.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("Unit not found with id: " + request.getUnitId()));

    TestPaper testPaper = new TestPaper();
    testPaper.setUnit(unit);
    testPaper.setTitle(request.getTitle());
    TestPaper savedTestPaper = testPaperRepository.save(testPaper);

    for (QuestionRegisterRequest questionRegister : request.getQuestions()) {
      Question question = new Question();
      question.setTestPaper(savedTestPaper);
      question.setContent(questionRegister.getContent());
      question.setPassage(questionRegister.getPassage());
      question.setCommentary(questionRegister.getCommentary());
      question.setType(questionRegister.getType());
      question.setLevel(questionRegister.getLevel());
      if (questionRegister.getType() == QuestionType.SUBJECTIVE) {
        question.setAnswerText(questionRegister.getAnswerText());
      } else {
        for (OptionRegisterRequest optionRegister : questionRegister.getOptions()) {
          Option option = new Option();
          option.setContent(optionRegister.getContent());
          option.setIsCorrect(optionRegister.getIsCorrect());
          option.setQuestion(question);
          question.getOptions().add(option);
        }
      }
      questionRepository.save(question);
    }
  }

  @Override
  @Transactional
  public void updateTestPaper(Long testPaperId, TestPaperRegisterRequest request) {
    if (testPaperId == null) {
      throw new IllegalArgumentException("시험지 ID는 null일 수 없습니다.");
    }

    TestPaper testPaper = testPaperRepository.findById(testPaperId)
            .orElseThrow(() -> new IllegalArgumentException("해당 시험지를 찾을 수 없습니다. ID: " + testPaperId));
    Unit unit = unitRepository.findById(request.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("Unit not found with id: " + request.getUnitId()));

    testPaper.setUnit(unit);
    testPaper.setTitle(request.getTitle());

    for (QuestionRegisterRequest questionRegister : request.getQuestions()) {
      Question question;

      if (questionRegister.getId() != null) {
        question = questionRepository.findById(questionRegister.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 질문을 찾을 수 없습니다. ID: " + questionRegister.getId()));
      } else {
        question = new Question();
        question.setTestPaper(testPaper);
      }

      question.setContent(questionRegister.getContent());
      question.setPassage(questionRegister.getPassage());
      question.setCommentary(questionRegister.getCommentary());
      question.setType(questionRegister.getType());
      question.setLevel(questionRegister.getLevel());

      if (questionRegister.getType() == QuestionType.SUBJECTIVE) {
        question.setAnswerText(questionRegister.getAnswerText());
      } else {
        question.getOptions().clear();  // 기존 옵션 제거
        for (OptionRegisterRequest optionRegister : questionRegister.getOptions()) {
          Option option = new Option();
          option.setContent(optionRegister.getContent());
          option.setIsCorrect(optionRegister.getIsCorrect());
          option.setQuestion(question);
          question.getOptions().add(option);
        }
      }
      questionRepository.save(question);
    }

    testPaperRepository.save(testPaper);
  }


  @Override
  public TestPaperResponse getTestPaperById(Long id) {
    TestPaper testPaper = testPaperRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 시험지를 찾을 수 없습니다. ID: " + id));
    return mapToTestPaperResponse(testPaper);
  }

  private TestPaperResponse mapToTestPaperResponse(TestPaper testPaper) {
    TestPaperResponse response = new TestPaperResponse();
    response.setTestPaperId(testPaper.getId());
    response.setTitle(testPaper.getTitle());
    response.setUnitId(testPaper.getUnit().getId()); // 추가: unitId 설정

    List<QuestionResponse> questionResponses = testPaper.getQuestions().stream().map(question -> {
      QuestionResponse questionResponse = new QuestionResponse();
      questionResponse.setId(question.getId());
      questionResponse.setContent(question.getContent());
      questionResponse.setCommentary(question.getCommentary());
      questionResponse.setAnswerText(question.getAnswerText());
      questionResponse.setType(question.getType());
      questionResponse.setLevel(question.getLevel());

      List<OptionResponse> optionResponses = question.getOptions().stream().map(option -> {
        OptionResponse optionResponse = new OptionResponse();
        optionResponse.setId(option.getId());
        optionResponse.setContent(option.getContent());
        optionResponse.setIsCorrect(option.getIsCorrect());
        return optionResponse;
      }).collect(Collectors.toList());

      questionResponse.setOptions(optionResponses);
      return questionResponse;
    }).collect(Collectors.toList());

    response.setQuestions(questionResponses);
    return response;
  }

  @Override
  @Transactional
  public void deleteTestPaper(Long testPaperId) {
    TestPaper testPaper = testPaperRepository.findById(testPaperId)
            .orElseThrow(() -> new IllegalArgumentException("해당 시험지를 찾을 수 없습니다. ID: " + testPaperId));
    testPaperRepository.delete(testPaper);
  }
}
