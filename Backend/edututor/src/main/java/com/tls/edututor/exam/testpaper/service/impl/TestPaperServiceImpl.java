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

/**
 * 시험지 관련 비즈니스 로직을 처리하는 서비스 구현 클래스입니다.
 * 시험지 생성, 수정, 조회, 삭제 등의 기능을 제공합니다.
 */
@RequiredArgsConstructor
@Service
public class TestPaperServiceImpl implements TestPaperService {

  private final TestPaperRepository testPaperRepository;
  private final QuestionRepository questionRepository;
  private final UnitRepository unitRepository;

  /**
   * 새 시험지와 관련된 문제 및 옵션을 생성합니다.
   *
   * @param request 시험지 등록 요청 객체
   */
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

  /**
   * 기존 시험지 정보를 수정합니다.
   * 문제 및 옵션도 함께 수정할 수 있습니다.
   *
   * @param testPaperId 수정할 시험지 ID
   * @param request 시험지 수정 요청 객체
   */
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
        question.getOptions().clear();
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

  /**
   * 시험지 ID에 해당하는 시험지를 조회합니다.
   *
   * @param id 조회할 시험지 ID
   * @return 시험지 조회 결과
   */
  @Override
  public TestPaperResponse getTestPaperById(Long id) {
    TestPaper testPaper = testPaperRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 시험지를 찾을 수 없습니다. ID: " + id));
    return mapToTestPaperResponse(testPaper);
  }

  /**
   * TestPaper 엔티티를 TestPaperResponse로 변환합니다.
   *
   * @param testPaper 변환할 시험지 엔티티
   * @return 변환된 시험지 응답 객체
   */
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

  /**
   * 시험지를 삭제합니다.
   *
   * @param testPaperId 삭제할 시험지 ID
   */
  @Override
  @Transactional
  public void deleteTestPaper(Long testPaperId) {
    TestPaper testPaper = testPaperRepository.findById(testPaperId)
            .orElseThrow(() -> new IllegalArgumentException("해당 시험지를 찾을 수 없습니다. ID: " + testPaperId));
    testPaperRepository.delete(testPaper);
  }
}
