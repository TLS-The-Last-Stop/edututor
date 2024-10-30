package com.tls.edututor.report.service;

import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ReportService {
  List<TestPaperResponse2> getTestPapers(Authentication authentication);

  TestPaperDetailResponse getTestPaperDetail(Long testPaperId);
}