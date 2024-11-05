package com.tls.edututor.common.initilizer;

import com.tls.edututor.board.board.entity.Board;
import com.tls.edututor.board.board.repository.BoardRepository;
import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.board.category.repository.CategoryRepository;
import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.codegroup.repository.CodeGroupRepository;
import com.tls.edututor.course.course.entity.Course;
import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.course.course.repository.CourseRepository;
import com.tls.edututor.course.courseclassroom.repository.CourseClassroomRepository;
import com.tls.edututor.course.section.entity.Section;
import com.tls.edututor.course.section.repository.SectionRepository;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import com.tls.edututor.course.material.entity.Material;
import com.tls.edututor.course.material.repository.MaterialRepository;
import com.tls.edututor.exam.option.entity.Option;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.question.entity.QuestionType;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.exam.question.repository.QuestionRepository;
import com.tls.edututor.exam.option.repository.OptionRepository;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import com.tls.edututor.exam.useransewer.repositroy.UserAnswerRepository;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import com.tls.edututor.school.dto.request.SchoolRequest;
import com.tls.edututor.school.entity.School;
import com.tls.edututor.school.repository.SchoolRepository;
import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class DataInitializer {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final SchoolRepository schoolRepository;
  private final ClassroomRepository classroomRepository;
  private final CourseRepository courseRepository;
  private final CourseClassroomRepository courseClassroomRepository;
  private final SectionRepository sectionRepository;
  private final UnitRepository unitRepository;
  private final MaterialRepository materialRepository;
  private final TestPaperRepository testPaperRepository;
  private final ShareTestRepository shareTestRepository;
  private final QuestionRepository questionRepository;
  private final OptionRepository optionRepository;
  private final CodeGroupRepository codeGroupRepository;
  private final CodeDetailRepository codeDetailRepository;
  private final UserAnswerRepository userAnswerRepository;
  private final UserTestRepository userTestRepository;
  private final CategoryRepository categoryRepository;
  private final BoardRepository boardRepository;

  public DataInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
                         SchoolRepository schoolRepository, ClassroomRepository classroomRepository,
                         CourseRepository courseRepository, CourseClassroomRepository courseClassroomRepository,
                         SectionRepository sectionRepository, UnitRepository unitRepository,
                         MaterialRepository materialRepository, TestPaperRepository testPaperRepository,
                         ShareTestRepository shareTestRepository, QuestionRepository questionRepository,
                         OptionRepository optionRepository, CodeGroupRepository codeGroupRepository, CodeDetailRepository codeDetailRepository,
                         UserAnswerRepository userAnswerRepository, UserTestRepository userTestRepository, CategoryRepository categoryRepository, BoardRepository boardRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.schoolRepository = schoolRepository;
    this.classroomRepository = classroomRepository;
    this.courseRepository = courseRepository;
    this.courseClassroomRepository = courseClassroomRepository;
    this.sectionRepository = sectionRepository;
    this.unitRepository = unitRepository;
    this.materialRepository = materialRepository;
    this.testPaperRepository = testPaperRepository;
    this.shareTestRepository = shareTestRepository;
    this.questionRepository = questionRepository;
    this.optionRepository = optionRepository;
    this.codeGroupRepository = codeGroupRepository;
    this.codeDetailRepository = codeDetailRepository;
    this.userAnswerRepository = userAnswerRepository;
    this.userTestRepository = userTestRepository;
    this.categoryRepository = categoryRepository;
    this.boardRepository = boardRepository;
  }

  @Bean
  public ApplicationRunner initializer() {
    return args -> {
      if (codeGroupRepository.count() > 0 || courseRepository.count() > 0) {
        return;
      }

      initAll();

      List<String> courses = List.of("초등학교 국어 1학년 교과서", "초등학교 수학 1학년 참고서", "영어의 정석 참고서", "이것이 과학이다 교과서",
              "미국 대선의 결과에 따른 대한민국 미래 예측", "중동, 이대로 괜찮은가", "대한민국 경제 발전 보고서");

      courses.forEach(courseName -> {
        CodeGroup codeGroup = codeGroupRepository.getReferenceById(1L);

        Course course = Course.builder()
                .courseName(courseName)
                .groupCode(codeGroup)
                .build();
        courseRepository.save(course);

        CourseClassroom courseClassroom = new CourseClassroom();
        courseClassroom.setCourse(course);
        courseClassroom.setClassroom(classroomRepository.findById(1L).orElseThrow());
        courseClassroomRepository.save(courseClassroom);

        List<String> sectionTitles = List.of("기본 개념", "응용", "심화 학습");
        sectionTitles.forEach(sectionTitle -> {
          Section section = Section.builder()
                  .course(course)
                  .content(sectionTitle)
                  .build();
          sectionRepository.save(section);

          List<String> unitTitles = List.of("개념 이해", "문제 풀이", "심화 학습");
          unitTitles.forEach(unitTitle -> {
            Unit unit = Unit.builder()
                    .section(section)
                    .content(sectionTitle + " - " + unitTitle)
                    .build();
            unitRepository.save(unit);

            Material material = Material.builder()
                    .unit(unit)
                    .title(unitTitle + " 자료")
                    .content(unitTitle + "에 대한 학습 자료입니다.")
                    .build();
            materialRepository.save(material);

            TestPaper testPaper = TestPaper.builder()
                    .unit(unit)
                    .title(unitTitle + " 시험지")
                    .build();
            testPaperRepository.save(testPaper);

            ShareTest shareTest = ShareTest.builder()
                    .user(userRepository.findById(2L).orElseThrow())
                    .testPaper(testPaper)
                    .build();
            shareTestRepository.save(shareTest);

            for (int i = 1; i <= 4; i++) {
              Question question = Question.builder()
                      .testPaper(testPaper)
                      .content("매우 어려운 문제 철수 영희 로엠잇" + i)
                      .type(QuestionType.OBJECTIVE)
                      .build();
              questionRepository.save(question);


              for (int j = 1; j <= 5; j++) {
                Option option = Option.builder()
                        .question(question)
                        .content("선택지 " + j)
                        .isCorrect(j == 1)
                        .build();
                optionRepository.save(option);
              }

              for (int k = 1; k <= 2; k++) {
                Question question2 = Question.builder()
                        .testPaper(testPaper)
                        .content("매우 어려운 주관식 문제 영어 국어 로엠잇" + i)
                        .type(QuestionType.SUBJECTIVE)
                        .answerText("해답입니다")
                        .build();
                questionRepository.save(question2);
              }
            }
          });
        });
      });

      if (categoryRepository.count() == 0) {
        initializeCategories();
      }
      if (userTestRepository.count() == 0) {
        initializeUserTests();
      }
      if (userAnswerRepository.count() == 0) {
        initializeUserAnswers();
      }
      if (boardRepository.count() == 0) {
        initializeBoards();
      }
    };
  }


  @Transactional
  protected void initAll() {
    if (codeGroupRepository.count() == 0) {
      initializeCodeGroupsAndDetails();
    }
    if (schoolRepository.count() == 0) {
      initializeSchools();
    }
    if (classroomRepository.count() == 0) {
      initializeClassrooms();
    }
    if (userRepository.count() == 0) {
      initializeTeachers();
      initializeAdmin();
    }

  }

  @Transactional
  protected void initializeCodeGroupsAndDetails() {
    AtomicInteger codeGroupIdCounter = new AtomicInteger(1);

    List<String> levels = List.of("초등학교", "중학교", "고등학교");
    List<String> elementaryYears = List.of("1학년", "2학년", "3학년", "4학년", "5학년", "6학년");
    List<String> middleHighYears = List.of("1학년", "2학년", "3학년");
    List<String> semesters = List.of("1학기", "2학기");
    List<String> subjects = List.of("국어", "수학", "영어", "사회", "과학", "역사", "도덕");

    levels.forEach(level -> {
      List<String> applicableYears = level.equals("초등학교") ? elementaryYears : middleHighYears;
      applicableYears.forEach(year -> {
        semesters.forEach(semester -> {
          subjects.forEach(subject -> {
            int codeGroupId = codeGroupIdCounter.getAndIncrement();
            CodeGroup codeGroup = codeGroupRepository.save(
                    new CodeGroup(null, "과정코드그룹-" + codeGroupId, null));
            codeDetailRepository.saveAll(List.of(
                    new CodeDetail(null, 1001, codeGroupId, subject, codeGroup),
                    new CodeDetail(null, 1002, codeGroupId, semester, codeGroup),
                    new CodeDetail(null, 1003, codeGroupId, year, codeGroup),
                    new CodeDetail(null, 1004, codeGroupId, level, codeGroup)
            ));
          });
        });
      });
    });
  }

  @Transactional
  protected void initializeSchools() {
    String[] classname = {"수완초등학교", "혁진중학교", "유리고등학교"};
    String[] schoolType = {"초등학교", "중학교", "고등학교"};
    String[] officeCode = {"1", "2", "3"};
    String[] address = {"충남 보령시", "서울 강남", "서울 을지로"};

    for (int i = 0; i < 3; i++) {
      SchoolRequest schoolRequest = new SchoolRequest();
      schoolRequest.setType(schoolType[i]);
      schoolRequest.setAddress(address[i]);
      schoolRequest.setName(classname[i]);
      schoolRequest.setOfficeCode(officeCode[i]);

      School school = School.withDto()
              .request(schoolRequest)
              .build();
      //school.setWriter(Long.valueOf(i) + 1);
      schoolRepository.save(school);
    }
  }

  @Transactional
  protected void initializeClassrooms() {
    String[] classroomName = {"수완반", "혁진반", "유리반"};
    String[] grade = {"1", "1", "1"};
    int[] year = {2024, 2023, 2022};

    for (int i = 0; i < 3; i++) {
      School school = schoolRepository.findById(Long.valueOf(i + 1)).orElseThrow();

      ClassroomRequest classroomRequest = new ClassroomRequest();
      classroomRequest.setClassroomName(classroomName[i]);
      classroomRequest.setGrade(grade[i]);
      classroomRequest.setYear(year[i]);

      Classroom classroom = Classroom.withDto()
              .request(classroomRequest)
              .school(school)
              .type(school.getType())
              .build();

      //classroom.setWriter(Long.valueOf(i) + 1);
      classroomRepository.save(classroom);
    }
  }

  private void initializeAdmin() {
    UserSURequest userSURequest = new UserSURequest();
    userSURequest.setFullName("관리자");
    userSURequest.setLoginId("admin");
    userSURequest.setPassword(passwordEncoder.encode("admin12!@"));
    userSURequest.setType("AD");

    User student = User.createStudent(userSURequest);
    userRepository.save(student);
  }

  @Transactional
  protected void initializeTeachers() {
    String[] teacherNames = {"이수완선생님", "이두완선생님", "카리나선생님"};
    String[] teacherLoginId = {"suwan1", "duwan1", "karina1"};
    String[] teacherPassword = {"suwan12!@", "duwan12!@", "karina12!@"};
    String[] teacherEmail = {"suwan@naver.com", "duwan@naver.com", "karina@naver.com"};
    String[] teacherPhoneNum = {"010-7196-2013", "010-7196-2013", "010-7196-2013"};
    LocalDate birthDay = LocalDate.of(1994, 2, 4);

    for (int i = 0; i < 3; i++) {
      Classroom classroom = classroomRepository.findById(Long.valueOf(i + 1)).orElseThrow();

      UserTERequest userTERequest = new UserTERequest();
      userTERequest.setFullName(teacherNames[i]);
      userTERequest.setLoginId(teacherLoginId[i]);
      userTERequest.setPassword(passwordEncoder.encode(teacherPassword[i]));
      userTERequest.setEmail(teacherEmail[i]);
      userTERequest.setPhoneNum(teacherPhoneNum[i]);
      userTERequest.setBirthDay(birthDay);
      userTERequest.setType("TE");

      User teacher = User.createTeacher(userTERequest);
      //teacher.setWriter(Long.valueOf(i) + 1);
      userRepository.save(teacher);

      teacher.setClassroom(classroom);
      userRepository.save(teacher);

      initStudents(classroom, i);
    }
  }

  @Transactional
  protected void initStudents(Classroom classroom, int idx) {
    String[] studentBaseNames = {"이수완", "이두완", "카리나"};
    String[] loginIdPrefixes = {"suwan", "duwan", "karina"};
    String[] passwordBase = {"suwan12!@", "duwan12!@", "karina12!@"};

    for (int studentNum = 1; studentNum <= 3; studentNum++) {
      UserTERequest userTERequest = new UserTERequest();

      userTERequest.setFullName(studentBaseNames[idx] + "학생" + studentNum);
      userTERequest.setLoginId(loginIdPrefixes[idx] + "_" + studentNum);
      userTERequest.setPassword(passwordEncoder.encode(passwordBase[idx]));
      userTERequest.setType("SU");

      User student = User.createTeacher(userTERequest);
      //student.setWriter(classroom.getId());
      userRepository.save(student);

      student.setClassroom(classroom);
      userRepository.save(student);
    }
  }

  @Transactional
  protected void initializeUserAnswers() {
    List<UserAnswer> answers = List.of(
            createUserAnswer(1L, true, 1L, "1"),
            createUserAnswer(2L, true, 2L, "2"),
            createUserAnswer(3L, false, 3L, "2"),
            createUserAnswer(4L, true, 4L, "1"),
            createUserAnswer(5L, false, 5L, "3"),
            createUserAnswer(6L, false, 6L, "2"),
            createUserAnswer(7L, false, 7L, "2"),
            createUserAnswer(8L, false, 8L, "3"),
            createUserAnswer(9L, true, 9L, "3"),
            createUserAnswer(10L, true, 10L, "3"),
            createUserAnswer(11L, true, 11L, "3"),
            createUserAnswer(12L, true, 12L, "3")
    );
    userAnswerRepository.saveAll(answers);
  }

  private UserAnswer createUserAnswer(Long id, boolean isCorrect, Long questionId, String answer) {
    UserAnswer userAnswer = new UserAnswer();
    userAnswer.setIsCorrect(isCorrect);
    userAnswer.setIsDeleted(false);
    userAnswer.setUserTest(userTestRepository.getReferenceById(1L));
    userAnswer.setCreatedAt(LocalDateTime.now());
    userAnswer.setId(id);
    userAnswer.setQuestion(questionRepository.getReferenceById(questionId));
    userAnswer.setSubmittedAt(LocalDateTime.now());
    userAnswer.setAnswer(answer);
    return userAnswer;
  }

  @Transactional
  protected void initializeUserTests() {
    UserTest test1 = new UserTest();
    test1.setIsDeleted(false);
    test1.setResult(0.0);
    test1.setCreatedAt(LocalDateTime.now());
    test1.setId(1L);
    test1.setShareTest(shareTestRepository.getReferenceById(1L));

    UserTest test2 = new UserTest();
    test2.setIsDeleted(false);
    test2.setResult(50.0);
    test2.setCreatedAt(LocalDateTime.now());
    test2.setId(2L);
    test2.setShareTest(shareTestRepository.getReferenceById(2L));

    UserTest test3 = new UserTest();
    test3.setIsDeleted(false);
    test3.setResult(0.0);
    test3.setCreatedAt(LocalDateTime.now());
    test3.setId(3L);
    test3.setShareTest(shareTestRepository.getReferenceById(3L));

    userTestRepository.saveAll(List.of(test1, test2, test3));
  }


  @Transactional
  protected void initializeCategories() {
    Category category1 = new Category();
    category1.setDepth(1);
    category1.setIsDeleted(false);
    category1.setId(1L);
    category1.setCreatedAt(LocalDateTime.now());
    category1.setName("공지사항");

    Category category2 = new Category();
    category2.setDepth(1);
    category2.setIsDeleted(false);
    category2.setId(2L);
    category2.setCreatedAt(LocalDateTime.now());
    category2.setName("자주 묻는 질문(FAQ)");

    Category category3 = new Category();
    category3.setDepth(1);
    category3.setIsDeleted(false);
    category3.setId(3L);
    category3.setCreatedAt(LocalDateTime.now());
    category3.setName("1:1 문의");

    Category category4 = new Category();
    category4.setDepth(1);
    category4.setIsDeleted(false);
    category4.setId(4L);
    category4.setCreatedAt(LocalDateTime.now());
    category4.setName("오류 문항 신고 현황");

    Category category5 = new Category();
    category5.setDepth(2);
    category5.setIsDeleted(false);
    category5.setId(5L);
    category5.setCreatedAt(LocalDateTime.now());
    category5.setParent(category2);
    category5.setName("클래스 운영");

    Category category6 = new Category();
    category5.setDepth(2);
    category5.setIsDeleted(false);
    category5.setId(5L);
    category5.setCreatedAt(LocalDateTime.now());
    category5.setParent(category2);
    category5.setName("코스웨어/문항");

    Category category7 = new Category();
    category5.setDepth(2);
    category5.setIsDeleted(false);
    category5.setId(5L);
    category5.setCreatedAt(LocalDateTime.now());
    category5.setParent(category2);
    category5.setName("서비스 이용");

    Category category8 = new Category();
    category5.setDepth(2);
    category5.setIsDeleted(false);
    category5.setId(5L);
    category5.setCreatedAt(LocalDateTime.now());
    category5.setParent(category2);
    category5.setName("시험지 배포");

    Category category9 = new Category();
    category5.setDepth(2);
    category5.setIsDeleted(false);
    category5.setId(5L);
    category5.setCreatedAt(LocalDateTime.now());
    category5.setParent(category2);
    category5.setName("리포트");

    Category category10 = new Category();
    category5.setDepth(2);
    category5.setIsDeleted(false);
    category5.setId(5L);
    category5.setCreatedAt(LocalDateTime.now());
    category5.setParent(category2);
    category5.setName("카테고리 테스트");

    categoryRepository.saveAll(List.of(category1, category2, category3, category4, category5, category6, category7, category8, category9, category10));
  }

  @Transactional
  protected void initializeBoards() {
    Board board1 = new Board();
    board1.setIsDeleted(false);
    board1.setCategory(categoryRepository.getReferenceById(1L));
    board1.setCreatedAt(LocalDateTime.now());
    board1.setTitle("지니아튜터 시범서비스 오픈");
    board1.setContent("지니아튜터가 8월31일에 시범서비스 오픈을 합니다.\n" +
            "\n" +
            "학교 현장에서 손쉽게 활용할 수 있도록 교과서 목차에 맞춰서 형성평가 문제를 제공합니다. 또한, 자동채점과 리포트를 제공하며 누적관리되어 선생님들의 수고를 덜어드릴 것입니다. 시범 서비스 기간 동안에 이용해 보시고 의견 보내주시면 서비스에 반영하도록 하겠습니다.\n" +
            "\n" +
            "선생님들이 필요한 서비스를 편리하게 이용하실 수 있도록 최선을 다하겠습니다.");

    Board board2 = new Board();
    board2.setIsDeleted(false);
    board2.setCategory(categoryRepository.getReferenceById(1L));
    board2.setCreatedAt(LocalDateTime.now());
    board2.setTitle("지니아튜터 베타테스터 모집");
    board2.setContent("지니아튜터가 시범서비스를 오픈하면서 베타테스터를 모집합니다.\n" +
            "\n" +
            "공교육에 활용하는 'AI 평가분석 서비스'가 필요하신 선생님께서는 신청하시고 무료로 이용해 주시면 감사하겠습니다.");

    Board board3 = new Board();
    board3.setIsDeleted(false);
    board3.setCategory(categoryRepository.getReferenceById(1L));
    board3.setCreatedAt(LocalDateTime.now());
    board3.setTitle("[이벤트]날 따라 해봐요 이렇게!");
    board3.setContent("우리반T셀파 X 지니아튜터 이벤트\n" +
            "\n" +
            "선생님이 더욱 편하고 효과적으로 이용하실 수 있도록 학생관리 기능과 온라인 평가 기능이 결합되었어요 그대~로 따라만 하면 이벤트 응모 완료!");

    Board board4 = new Board();
    board4.setIsDeleted(false);
    board4.setCategory(categoryRepository.getReferenceById(5L));
    board4.setCreatedAt(LocalDateTime.now());
    board4.setTitle("클래스 생성 및 관리는 어떻게 하나요?");
    board4.setContent("지니아튜터의 클래스는 우리반T셀파(class.tsherpa.co.kr)의 클래스와 연동됩니다.\n" +
            "\n" +
            "따라서 클래스 생성과 관리는 우리반T셀파에서 하실 수 있습니다.");

    Board board5 = new Board();
    board5.setIsDeleted(false);
    board5.setCategory(categoryRepository.getReferenceById(6L));
    board5.setCreatedAt(LocalDateTime.now());
    board5.setTitle("코스웨어는 어떤 기준으로 설정되어 있나요?");
    board5.setContent("지니아튜터의 코스웨어는 크게 2가지 기준으로 나뉩니다.\n" +
            "하나는 천재교과서에서 발행하는 교과서의 목차에 맞춰서 설정하였고\n" +
            "\n" +
            "천재교과서를 이용하지 않는 학교를 위해 성취기준에 맞춘 과정도 준비하였습니다.");

    boardRepository.saveAll(List.of(board1, board2, board3, board4, board5));
  }

}
