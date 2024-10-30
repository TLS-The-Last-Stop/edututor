package com.tls.edututor.report.service.impl;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.dto.response.UserTestResponse2;
import com.tls.edututor.report.repository.*;
import com.tls.edututor.report.service.ReportService;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
  private final CourseClassroomRepository2 courseClassroomRepository2;
  private final TestPaperRepository2 testPaperRepository2;
  private final UserTestRepository2 userTestRepository2;
  private final UserAnswerRepository2 userAnswerRepository2;
  private final QuestionRepository2 questionRepository2;

  public List<TestPaperResponse2> getTestPapers(Authentication authentication) {
    List<Long> courseIds = new ArrayList<>();
    Classroom classroom = ((AuthUser) authentication.getPrincipal()).getClassroom();

    for (CourseClassroom cc : courseClassroomRepository2.findByClassroomId(classroom.getId())) {
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
    TestPaper testPaper = testPaperRepository2.findByUnitId(testPaperId);
    List<UserTest> userTests = userTestRepository2.findByTestPaperId(testPaperId);
    List<UserTestResponse2> userTestResponses = new ArrayList<>();

    for (UserTest userTest : userTests) {
      List<String> userAnswers = new ArrayList<>();
      List<Boolean> isCorrect = new ArrayList<>();
      List<UserAnswer> userAnswersList = userAnswerRepository2.findByUserTestId(userTest.getId());
      for (UserAnswer userAnswer : userAnswersList) {
        userAnswers.add(userAnswer.getAnswer());
        isCorrect.add(userAnswer.getIsCorrect());
      }

      List<String> correctAnswers = new ArrayList<>();
      List<Question> correctAnswersList = questionRepository2.findByTestPaperId(testPaperId);

      for (Question question : correctAnswersList) {
        correctAnswers.add(question.getAnswerText());
      }

      UserTestResponse2 userTestResponse = UserTestResponse2.builder()
              .userName(userTest.getShareTest().getUser().getFullName())
              .achievementRate((long) achievementRate(isCorrect))
              .userAnswers(userAnswers)
              .correctAnswers(correctAnswers)
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

  private double achievementRate(List<Boolean> icCorrect) {
    int correctAnswersCnt = 0;
    for (Boolean correct : icCorrect) {
      if (correct) {
        correctAnswersCnt++;
      }
    }
    return (double) correctAnswersCnt / icCorrect.size() * 100;
  }
}