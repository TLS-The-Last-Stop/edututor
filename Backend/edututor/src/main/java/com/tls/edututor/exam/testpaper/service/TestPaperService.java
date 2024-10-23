package com.tls.edututor.exam.testpaper.service;

import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;

public interface TestPaperService {

  void createTestPaperWithQuestionsAndOptions(TestPaperRegisterRequest request);
}
