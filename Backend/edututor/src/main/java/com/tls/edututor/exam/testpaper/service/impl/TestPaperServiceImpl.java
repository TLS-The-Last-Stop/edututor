package com.tls.edututor.exam.testpaper.service.impl;

import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import com.tls.edututor.exam.option.dto.request.OptionRegisterRequest;
import com.tls.edututor.exam.option.entity.Option;
import com.tls.edututor.exam.option.repository.OptionRepository;
import com.tls.edututor.exam.question.dto.request.QuestionRegisterRequest;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.testpaper.service.TestPaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class TestPaperServiceImpl implements TestPaperService {

  private final TestPaperRepository testPaperRepository;
  private final QuestionRepository questionRepository;
  private final OptionRepository optionRepository;
  private final UnitRepository unitRepository;

  @Override
  @Transactional
  public void createTestPaperWithQuestionsAndOptions(TestPaperRegisterRequest request) {
    Unit unit = unitRepository.findById(request.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("Unit not found with id: " + request.getUnitId()));

    TestPaper testPaper = new TestPaper();
    testPaper.setUnit(unit);
    testPaper.setTitle(request.getTitle());
    testPaper.setContent(request.getContent());
    TestPaper savedTestPaper = testPaperRepository.save(testPaper);

    for (QuestionRegisterRequest questionRegister : request.getQuestions()) {
      Question question = new Question();
      question.setTestPaper(savedTestPaper);
      question.setContent(questionRegister.getContent());
      question.setPassage(questionRegister.getPassage());
      question.setCommentary(questionRegister.getCommentary());
      Question savedQuestion = questionRepository.save(question);

      for (OptionRegisterRequest optionRegister : questionRegister.getOptions()) {
        Option option = new Option();
        option.setQuestion(savedQuestion);
        option.setContent(optionRegister.getContent());
        option.setIsCorrect(optionRegister.getIsCorrect());
        optionRepository.save(option);
      }
    }
  }
}

