package com.tls.edututor.report.service.impl;

import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.dto.response.UserTestResponse2;
import com.tls.edututor.report.repository.CourseClassroomRepository2;
import com.tls.edututor.report.repository.TestPaperRepository2;
import com.tls.edututor.report.repository.UserTestRepository2;
import com.tls.edututor.report.service.ReportService;
import com.tls.edututor.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
  private final CourseClassroomRepository2 courseClassroomRepository2;
  private final TestPaperRepository2 testPaperRepository2;
  private final UserTestRepository2 userTestRepository2;

  public List<TestPaperResponse2> getTestPapers(Long classroomId) {
    List<Long> courseIds = new ArrayList<>();
    for (CourseClassroom cc : courseClassroomRepository2.findByClassroomId(classroomId)) {
      courseIds.add(cc.getCourse().getId());
    }

    List<TestPaperResponse2> testPapers = new ArrayList<>();
    for (TestPaper testPaper : testPaperRepository2.findByUnitCourseIdInAndIsDeletedFalse(courseIds)) {
      TestPaperResponse2 response = TestPaperResponse2.builder()
              .id(testPaper.getId())
              .title(testPaper.getTitle())
              .courseName(testPaper.getUnit().getSection().getCourse().getCourseName())
              .unitName(testPaper.getUnit().getContent())
              .createAt(LocalDate.from(testPaper.getCreatedAt()))
              .build();
      testPapers.add(response);
    }

    return testPapers;
  }

  public TestPaperDetailResponse getTestPaperDetail(Long testPaperId) {
    //시험지 조회
    TestPaper testPaper = testPaperRepository2.findByUnitId(testPaperId);
    if (testPaper == null) {
      log.error("TestPaper not found for ID: {}", testPaperId);
    }

    //해당 시험에 대한 학생 정보
    List<UserTest> userTests = userTestRepository2.findByTestPaperId(testPaperId);
    List<UserTestResponse2> userTestResponses = new ArrayList<>();
    for (UserTest userTest : userTests) {
      UserTestResponse2 userTestResponse = UserTestResponse2.builder()
              .userName(userTest.getUser().getFullName())
              .build();
      userTestResponses.add(userTestResponse);
    }

    TestPaperDetailResponse testPaperDetailResponse = TestPaperDetailResponse.builder()
            .id(testPaper.getId())
            .title(testPaper.getTitle())
            .sectionName(testPaper.getUnit().getSection().getContent())
            .unitName(testPaper.getUnit().getContent())
            .userTestResponse2List(userTestResponses)
            .build();

    return testPaperDetailResponse;
  }
}