package com.tls.edututor.report.service.impl;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.course.courseclassroom.repository.CourseClassroomRepository;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.useransewer.dto.response.UserAnswerResponse;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import com.tls.edututor.report.dto.response.ShareTestResponse;
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
import org.springframework.data.domain.PageImpl;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 리포트 서비스는 시험지 및 공유된 시험지에 대한 상세 정보와 관련된 기능을 제공합니다.
 * 시험지 목록, 시험지 상세 정보, 공유된 시험지 목록 및 상세 정보를 조회하는 메서드를 구현합니다.
 */
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

  /**
   * {@inheritDoc}
   *
   * 지정된 코스에 대한 시험지 목록을 페이지 형식으로 조회합니다.
   *
   * @param authentication 현재 인증된 사용자 정보
   * @param pageable 페이지네이션 정보 (페이지 번호, 크기 등)
   * @param courseId 조회할 코스의 ID
   * @return 해당 코스에 대한 시험지 목록을 포함하는 페이지 객체
   */
  public Page<TestPaperResponse2> getTestPapers(Authentication authentication, Pageable pageable, Long courseId) {
    List<Long> courseIds = new ArrayList<>();
    Classroom classroom = ((AuthUser) authentication.getPrincipal()).getClassroom();

    for (CourseClassroom cc : courseClassroomRepository.findByClassroomId(classroom.getId())) {
      courseIds.add(cc.getCourse().getId());
    }

    Page<TestPaper> testPaperPage = testPaperRepository.findByUnitCourseIdInAndIsDeletedFalse(courseIds, courseId, pageable);

    List<TestPaperResponse2> filteredTestPapers = testPaperPage.stream()
            .map(testPaper -> {
              long totalCount = shareTestRepository.countByTestPaperId(testPaper.getId());

              if (totalCount == 0) {
                return null;
              }

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
                      .createdAt(LocalDate.from(testPaper.getCreatedAt()))
                      .participationCount((int) participationCount)
                      .totalCount((int) totalCount)
                      .achievementRate(Double.valueOf(String.format("%.0f", avgAchievementRate)))
                      .build();
            })
            .filter(Objects::nonNull)
            .collect(Collectors.toList());

    return new PageImpl<>(filteredTestPapers, pageable, filteredTestPapers.size());
  }

  /**
   * {@inheritDoc}
   *
   * 특정 시험지의 상세 정보를 조회합니다.
   *
   * @param testPaperId 조회할 시험지의 ID
   * @return 지정된 시험지의 상세 정보를 담은 객체
   */
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
              .questionCount(questionCount)
              .isCorrect(isCorrect)
              .build();
      userTestResponses.add(userTestResponse);
    }

    TestPaperDetailResponse testPaperDetailResponse = TestPaperDetailResponse.builder()
            .id(testPaper.getId())
            .title(testPaper.getUnit().getSection().getCourse().getCourseName())
            .sectionName(testPaper.getUnit().getSection().getContent())
            .unitName(testPaper.getUnit().getContent())
            .userTestResponse2List(userTestResponses)
            .build();

    return testPaperDetailResponse;
  }

  /**
   * 정답률을 계산하는 메서드입니다.
   *
   * @param isCorrect 사용자 정답 여부 리스트
   * @return 정답률
   */
  private double achievementRate(List<Boolean> isCorrect) {
    if (isCorrect.isEmpty()) {
      return 0;
    }

    int correctAnswersCnt = 0;
    for (Boolean correct : isCorrect) {
      if (correct) {
        correctAnswersCnt++;
      }
    }
    return (double) correctAnswersCnt / isCorrect.size() * 100;
  }

  /**
   * {@inheritDoc}
   *
   * 사용자가 공유한 시험지 목록을 페이지 형식으로 조회합니다.
   *
   * @param authentication 현재 인증된 사용자 정보
   * @param pageable 페이지네이션 정보 (페이지 번호, 크기 등)
   * @return 사용자가 공유한 시험지 목록을 포함하는 페이지 객체
   */
  @Override
  public Page<ShareTestResponse> getSharedTests(Authentication authentication, Pageable pageable) {
    Long userId = ((AuthUser) authentication.getPrincipal()).getId();

    return shareTestRepository.findByUserId(userId, pageable)
            .map(shareTest -> {
              List<UserAnswerResponse> questionResponses = shareTest.getUserTests().stream()
                      .flatMap(userTest -> userTest.getUserAnswers().stream())
                      .map(UserAnswerResponse::fromUserAnswer)
                      .collect(Collectors.toList());

              Double totalScore = questionResponses.stream()
                      .filter(UserAnswerResponse::isCorrect)
                      .mapToDouble(UserAnswerResponse::getScore)
                      .sum();

              return ShareTestResponse.builder()
                      .userTestId(shareTest.getId())
                      .testPaperName(shareTest.getTestPaper().getTitle())
                      .questions(questionResponses)
                      .totalScore(totalScore)
                      .build();
            });
  }


  /**
   * {@inheritDoc}
   *
   * 특정 공유된 시험지의 상세 정보를 조회합니다.
   *
   * @param userTestId 조회할 공유된 시험지의 ID
   * @return 지정된 공유된 시험지의 상세 정보를 담은 객체
   */
  @Override
  public ShareTestResponse getSharedTestDetail(Long userTestId) {
    UserTest userTest = userTestRepository.findById(userTestId)
            .orElseThrow(() -> new RuntimeException("유저 테스트를 찾을 수 없습니다."));

    return ShareTestResponse.fromUserTest(userTest);
  }
}