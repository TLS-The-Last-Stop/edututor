package com.tls.edututor.exam.testpaper.service;

import com.tls.edututor.exam.testpaper.dto.request.TestPaperRegisterRequest;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;

public interface TestPaperService {

  void createTestPaperWithQuestionsAndOptions(TestPaperRegisterRequest request);

  TestPaperResponse getTestPaperById(Long id);
}
