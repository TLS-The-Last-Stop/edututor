package com.tls.edututor.exam.exam.service;

import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;

import java.util.List;

public interface ExamService {

  TestPaper getTestPaperById(Long testPaperId);

  void submitUserAnswers(List<UserAnswer> userAnswers);

  void saveUserTestResult(UserTest userTest);

  TestPaperResponse convertToDTO(TestPaper testPaper);
}
