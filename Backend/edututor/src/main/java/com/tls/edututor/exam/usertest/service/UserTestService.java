package com.tls.edututor.exam.usertest.service;

import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;


public interface UserTestService {

  StudentTestPaperResponse getTestPaper(Long testPaperId);

  void submitAndGradeUserTest(UserTestRequest userTestRequest);
}
