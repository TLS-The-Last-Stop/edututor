package com.tls.edututor.report.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("report")
public class ReportController {
    private final ReportService reportService;

    public CommonApiResponse<List<TestPaperResponse2>> getTestPapers(Long classroomId){
        return CommonApiResponse.createSuccess("report", reportService.getTestPapers(classroomId));
    }
}