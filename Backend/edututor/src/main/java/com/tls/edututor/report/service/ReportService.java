package com.tls.edututor.report.service;

import com.tls.edututor.report.dto.response.ShareTestResponse;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

public interface ReportService {
  Page<TestPaperResponse2> getTestPapers(Authentication authentication, Pageable pageable, Long CourseId);

  TestPaperDetailResponse getTestPaperDetail(Long testPaperId);

  Page<ShareTestResponse> getSharedTests(Authentication authentication, Pageable pageable);
}