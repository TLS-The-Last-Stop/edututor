package com.tls.edututor.report.service.impl;

import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.repository.CourseClassroomRepository2;
import com.tls.edututor.report.repository.TestPaperRepository2;
import com.tls.edututor.report.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
  private final CourseClassroomRepository2 courseClassroomRepository2;
  private final TestPaperRepository2 testPaperRepository2;

    public List<TestPaperResponse2> getTestPapers(Long classroomId) {
      List<Long> courseIds = new ArrayList<>();
      for (CourseClassroom cc : courseClassroomRepository2.findByClassroomId(classroomId)) {
        courseIds.add(cc.getCourse().getId());
      }

      List<TestPaperResponse2> testPaters = new ArrayList<>();
      for(TestPaper testPaper : testPaperRepository2.findByUnitCourseIdInAndIsDeletedFalse(courseIds)) {
        testPaters.add(convertToResponse(testPaper));
      }

        return testPaters;
    }

    private TestPaperResponse2 convertToResponse(TestPaper testPaper){
      return TestPaperResponse2.builder()
              .id(testPaper.getId())
              .title(testPaper.getTitle())
              .courseName(testPaper.getUnit().getSection().getCourse().getCourseName())
              .unitName(testPaper.getUnit().getContent())
              .createAt(LocalDate.from(testPaper.getCreatedAt()))
              .build();
    }
}