package com.tls.edututor.exam.exam.service;

import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.useransewer.dto.request.UserAnswerRequest;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;

import java.util.List;

public interface ExamService {

  TestPaper getTestPaperById(Long testPaperId);

  void submitUserAnswers(List<UserAnswerRequest> userAnswers);

  void saveUserTestResult(UserTestRequest userTestRequest);

  StudentTestPaperResponse convertToDTO(TestPaper testPaper);


}
