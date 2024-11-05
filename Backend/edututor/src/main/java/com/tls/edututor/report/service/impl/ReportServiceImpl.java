package com.tls.edututor.report.service.impl;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.course.courseclassroom.repository.CourseClassroomRepository;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import com.tls.edututor.report.dto.response.TestPaperDetailResponse;
import com.tls.edututor.report.dto.response.TestPaperResponse2;
import com.tls.edututor.report.dto.response.UserTestResponse2;
import com.tls.edututor.report.service.ReportService;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {
  private final CourseClassroomRepository courseClassroomRepository;
  private final TestPaperRepository testPaperRepository;
  private final UserTestRepository userTestRepository;
  private final UserAnswerRepository userAnswerRepository;
  private final QuestionRepository questionRepository;
  private final ShareTestRepository shareTestRepository;

  public Page<TestPaperResponse2> getTestPapers(Authentication authentication, Pageable pageable, Long courseId) {
    List<Long> courseIds = new ArrayList<>();
    Classroom classroom = ((AuthUser) authentication.getPrincipal()).getClassroom();

    for (CourseClassroom cc : courseClassroomRepository.findByClassroomId(classroom.getId())) {
      courseIds.add(cc.getCourse().getId());
    }

    Page<TestPaper> testPaperPage = testPaperRepository.findByUnitCourseIdInAndIsDeletedFalse(courseIds, courseId, pageable);

    return testPaperPage.map(testPaper -> {
      long totalCount = shareTestRepository.countByTestPaperId(testPaper.getId());
      long participationCount = userTestRepository.countByShareTestTestPaperId(testPaper.getId());
      Double avgAchievementRate = 0.0;

      if (participationCount > 0) {
        List<UserTest> userTests = userTestRepository.findByTestPaperId(testPaper.getId());
        double totalRate = 0.0;

        for (UserTest userTest : userTests) {
          List<UserAnswer> userAnswers = userAnswerRepository.findByUserTestId(userTest.getId());
          List<Boolean> isCorrect = new ArrayList<>();
          for (UserAnswer userAnswer : userAnswers) {
            isCorrect.add(userAnswer.getIsCorrect());
          }
          totalRate += achievementRate(isCorrect);
        }
        avgAchievementRate = totalRate / participationCount;
      }

      return TestPaperResponse2.builder()
              .id(testPaper.getId())
              .title(testPaper.getTitle())
              .courseName(testPaper.getUnit().getSection().getCourse().getCourseName())
              .unitName(testPaper.getUnit().getContent())
              .createAt(LocalDate.from(testPaper.getCreatedAt()))
              .participationCount((int) participationCount)
              .totalCount((int) totalCount)
              .achievementRate(Double.valueOf(String.format("%.1f", avgAchievementRate)))
              .build();
    });
  }

  public TestPaperDetailResponse getTestPaperDetail(Long testPaperId) {
    TestPaper testPaper = testPaperRepository.findByUnitId(testPaperId);
    List<UserTest> userTests = userTestRepository.findByTestPaperId(testPaperId);
    List<UserTestResponse2> userTestResponses = new ArrayList<>();

    for (UserTest userTest : userTests) {
      List<String> userAnswers = new ArrayList<>();
      List<Boolean> isCorrect = new ArrayList<>();
      List<UserAnswer> userAnswersList = userAnswerRepository.findByUserTestId(userTest.getId());
      for (UserAnswer userAnswer : userAnswersList) {
        userAnswers.add(userAnswer != null ? userAnswer.getAnswer() : "");
        isCorrect.add(userAnswer != null ? userAnswer.getIsCorrect() : false);
      }

      List<String> correctAnswers = new ArrayList<>();
      List<Question> correctAnswersList = questionRepository.findByTestPaperId(testPaperId);
      for (Question question : correctAnswersList) {
        correctAnswers.add(question.getAnswerText());
      }

      long questionCount = questionRepository.countByTestPaperId(testPaperId);

      UserTestResponse2 userTestResponse = UserTestResponse2.builder()
              .userName(userTest.getShareTest().getUser().getUsername())
              .achievementRate((long) achievementRate(isCorrect))
              .userAnswers(userAnswers)
//              .correctAnswers(correctAnswers)
              .questionCount(questionCount)
              .isCorrect(isCorrect)
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

  private double achievementRate(List<Boolean> isCorrect) {
    if (isCorrect.isEmpty()) {
      return 0.0;
    }

    int correctAnswersCnt = 0;
    for (Boolean correct : isCorrect) {
      if (correct) {
        correctAnswersCnt++;
      }
    }
    return (double) correctAnswersCnt / isCorrect.size() * 100;
  }
}