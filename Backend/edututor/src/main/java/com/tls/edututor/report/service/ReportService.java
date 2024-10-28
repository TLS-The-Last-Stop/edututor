package com.tls.edututor.report.service;

import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;

import java.util.List;

public interface ReportService {
  List<TestPaperResponse2> getTestPapers(Long classroomId);

  TestPaperDetailResponse getTestPaperDetail(Long testPaperId);
}