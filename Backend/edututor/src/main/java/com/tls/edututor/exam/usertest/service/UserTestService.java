package com.tls.edututor.exam.usertest.service;

import com.tls.edututor.exam.testpaper.dto.response.StudentTestPaperResponse;
import com.tls.edututor.exam.usertest.dto.request.UserTestRequest;
import org.springframework.security.core.Authentication;


public interface UserTestService {

  StudentTestPaperResponse getTestPaper(Long testPaperId);

  void submitAndGradeUserTest(UserTestRequest userTestRequest, Authentication authentication);
}
