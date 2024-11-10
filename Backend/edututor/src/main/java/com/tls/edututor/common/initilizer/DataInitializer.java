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
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

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
    if (categoryRepository.count() == 0) {
      initializeCategories();
    }
    if (boardRepository.count() == 0) {
      initializeBoards();
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
    String[] classname = {"에듀초등학교", "에듀중학교", "에듀고등학교"};
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
      classroomRepository.save(classroom);
    }
  }

  private void initializeAdmin() {
    UserSURequest userSURequest = new UserSURequest();
    userSURequest.setUsername("관리자");
    userSURequest.setLoginId("admin");
    userSURequest.setPassword(passwordEncoder.encode("qwer1234!!"));
    userSURequest.setType("AD");

    User student = User.createStudent(userSURequest);
    userRepository.save(student);
  }

  @Transactional
  protected void initializeTeachers() {
    String[] teacherNames = {"이수완선생님", "김혁진선생님", "한유리선생님"};
    String[] teacherLoginId = {"teacher1", "teacher2", "teacher3"};
    String[] teacherPassword = {"qwer1234!!", "qwer1234!!", "qwer1234!!"};
    String[] teacherEmail = {"suwan@naver.com", "duwan@naver.com", "karina@naver.com"};
    String[] teacherPhoneNum = {"010-7196-2013", "010-7196-2013", "010-7196-2013"};
    LocalDate birthDay = LocalDate.of(1994, 2, 4);

    for (int i = 0; i < 3; i++) {
      Classroom classroom = classroomRepository.findById(Long.valueOf(i + 1)).orElseThrow();

      UserTERequest userTERequest = new UserTERequest();
      userTERequest.setUsername(teacherNames[i]);
      userTERequest.setLoginId(teacherLoginId[i]);
      userTERequest.setPassword(passwordEncoder.encode(teacherPassword[i]));
      userTERequest.setEmail(teacherEmail[i]);
      userTERequest.setPhoneNum(teacherPhoneNum[i]);
      userTERequest.setBirthDay(birthDay);
      userTERequest.setType("TE");

      User teacher = User.createTeacher(userTERequest);
      userRepository.save(teacher);

      teacher.setClassroom(classroom);
      userRepository.save(teacher);

      initStudents(classroom, i + 1);
    }
  }

  @Transactional
  protected void initStudents(Classroom classroom, int idx) {
    for (int studentNum = 1; studentNum <= 3; studentNum++) {
      UserTERequest userTERequest = new UserTERequest();

      userTERequest.setUsername("학생" + studentNum);
      userTERequest.setLoginId("student" + idx + "_" + studentNum);
      userTERequest.setPassword(passwordEncoder.encode("qwer1234!!"));
      userTERequest.setType("SU");

      User student = User.createTeacher(userTERequest);
      userRepository.save(student);

      student.setClassroom(classroom);
      userRepository.save(student);
    }
  }

  @Bean
  public ApplicationRunner initializer() {
    return args -> {
      if (codeGroupRepository.count() > 0 || courseRepository.count() > 0) {
        return;
      }

      initAll();

      List<String> courses = List.of(
              "국어 기초 튼튼: 국어 1학년 교과서",
              "수학 첫걸음: 수학 1학년 참고서",
              "영어의 기본: 초등 필수 참고서",
              "이것이 사회이다: 사회 교과서"
      );
      AtomicLong idCounter = new AtomicLong(1);

      courses.forEach(courseName -> {
        CodeGroup codeGroup = codeGroupRepository.getReferenceById(idCounter.getAndIncrement());
        Course course = Course.builder()
                .courseName(courseName)
                .groupCode(codeGroup)
                .build();
        courseRepository.save(course);

        CourseClassroom courseClassroom = new CourseClassroom();
        courseClassroom.setCourse(course);
        courseClassroom.setClassroom(classroomRepository.findById(1L).orElseThrow());
        courseClassroomRepository.save(courseClassroom);

        List<String> sectionTitles;
        List<String> unitTitles;

        switch (courseName) {
          case "국어 기초 튼튼: 국어 1학년 교과서":
            sectionTitles = List.of("우리말 소리 익히기", "재미있는 단어 놀이", "문장 만들기 놀이", "이야기 듣고 상상하기", "감정을 표현하는 말");
            unitTitles = List.of(
                    "한글 자음과 모음 소리를 듣고 따라하며 기본 글자 익히기.",
                    "친숙한 단어를 그림과 함께 배우며 어휘력 넓히기.",
                    "짧은 문장을 만들어 보며 문장 구성 원리 이해하기.",
                    "동화를 듣고 이야기를 상상하며 말로 표현하기.",
                    "기쁨, 슬픔, 화남 등 감정을 표현하는 다양한 말 배우기."
            );
            break;

          case "수학 첫걸음: 수학 1학년 참고서":
            sectionTitles = List.of("숫자와 친해지기", "수와 수 비교하기", "덧셈과 뺄셈의 시작", "모양과 도형 탐구하기", "생활 속 문제 해결하기");
            unitTitles = List.of(
                    "1부터 10까지 숫자를 배우고 쓰는 연습",
                    "큰 수와 작은 수를 비교하고 정렬하는 법 배우기",
                    "간단한 덧셈과 뺄셈을 통해 연산의 기초 다지기",
                    "원, 삼각형, 사각형 등 기본 도형을 인식하고 그리기",
                    "일상 생활에서 쉽게 접하는 수학적 문제를 풀어보며 적용해 보기"
            );
            break;

          case "영어의 기본: 초등 필수 참고서":
            sectionTitles = List.of("기초 인사 표현 익히기", "나를 소개해요", "숫자와 색깔 배우기", "가족과 친구 소개하기", "일상 표현 배우기");
            unitTitles = List.of(
                    "Hello, How are you? 등의 기본적인 인사말 배우기",
                    "자신의 이름과 나이를 영어로 소개하는 법 배우기",
                    "영어로 숫자 세기와 색깔 이름 익히기",
                    "가족과 친구에 대해 영어로 표현하는 방법 익히기",
                    "자주 사용하는 표현들 (Thank you, I’m sorry, Yes, No) 익히기"
            );
            break;

          case "이것이 사회이다: 사회 교과서":
            sectionTitles = List.of("내 주변의 사회", "사회의 성장 과정", "사회의 힘", "사회 변화와 날씨", "우리 몸의 신비");
            unitTitles = List.of(
                    "일상 속에 숨겨진 사회 원리를 찾아보고 이해하기",
                    "사회 씨앗이 자라나는 과정과 사회의 성장 단계 관찰하기",
                    "사회 특성과 사회 성질, 이들의 상호작용 알아보기",
                    "계절에 따른 사회 변화와 그 원인 탐구하기",
                    "신체 각 부위의 역할과 건강하게 유지하는 방법 배우기"
            );
            break;

          default:
            throw new IllegalArgumentException("알 수 없는 과정입니다: " + courseName);
        }

        sectionTitles.forEach(sectionTitle -> {
          Section section = Section.builder()
                  .course(course)
                  .content(sectionTitle)
                  .build();
          sectionRepository.save(section);

          unitTitles.forEach(unitTitle -> {
            Unit unit = Unit.builder()
                    .section(section)
                    .content(unitTitle)
                    .build();
            unitRepository.save(unit);

            Material material = Material.builder()
                    .unit(unit)
                    .title(unitTitle)
                    .content(unitTitle + "에 대한 학습 자료입니다.")
                    .url("https://www.youtube.com/watch?v=lWCEvcRqCDk&list=PLbPxj9t5bO9hdEvCenkzR9s8cBdkaWe_W")
                    .build();
            materialRepository.save(material);

            TestPaper testPaper = TestPaper.builder()
                    .unit(unit)
                    .title(unitTitle)
                    .build();
            testPaperRepository.save(testPaper);

            for (int i = 1; i <= 10; i++) {
              String questionContent;
              String answer;

              switch (unitTitle) {
                case "한글 자음과 모음 소리를 듣고 따라하며 기본 글자 익히기.":
                  questionContent = "자음 'ㄱ'과 모음 'ㅏ'를 합치면 어떤 글자가 될까요?";
                  answer = "가";
                  break;
                case "1부터 10까지 숫자를 배우고 쓰는 연습":
                  questionContent = "5 + " + i + "은 얼마인가요?";
                  answer = String.valueOf(5 + i);
                  break;
                default:
                  questionContent = "임의의 문제입니다 " + i;
                  answer = "정답입니다";
                  break;
              }

              Question question = Question.builder()
                      .testPaper(testPaper)
                      .content(questionContent)
                      .type(i % 2 == 0 ? QuestionType.OBJECTIVE : QuestionType.SUBJECTIVE)
                      .level(new Random().nextInt(3) + 1)
                      .answerText(answer)
                      .build();
              questionRepository.save(question);

              if (question.getType() == QuestionType.OBJECTIVE) {
                for (int j = 1; j <= 5; j++) {
                  Option option = Option.builder()
                          .question(question)
                          .content("선택지 " + j)
                          .isCorrect(j == 1)
                          .build();
                  optionRepository.save(option);
                }
              }
            }
          });
        });
      });
    };
  }


//  @Transactional
//  protected void initializeUserAnswers() {
//    List<UserAnswer> answers = List.of(
//            createUserAnswer(1L, true, 1L, "1"),
//            createUserAnswer(2L, true, 2L, "2"),
//            createUserAnswer(3L, false, 3L, "2"),
//            createUserAnswer(4L, true, 4L, "1"),
//            createUserAnswer(5L, false, 5L, "3"),
//            createUserAnswer(6L, false, 6L, "2"),
//            createUserAnswer(7L, false, 7L, "2"),
//            createUserAnswer(8L, false, 8L, "3"),
//            createUserAnswer(9L, true, 9L, "3"),
//            createUserAnswer(10L, true, 10L, "3"),
//            createUserAnswer(11L, true, 11L, "3"),
//            createUserAnswer(12L, true, 12L, "3")
//    );
//    userAnswerRepository.saveAll(answers);
//  }

//  private UserAnswer createUserAnswer(Long id, boolean isCorrect, Long questionId, String answer) {
//    UserAnswer userAnswer = new UserAnswer();
//    userAnswer.setIsCorrect(isCorrect);
//    userAnswer.setIsDeleted(false);
//    userAnswer.setUserTest(userTestRepository.getReferenceById(1L));
//    userAnswer.setCreatedAt(LocalDateTime.now());
//    userAnswer.setId(id);
//    userAnswer.setQuestion(questionRepository.getReferenceById(questionId));
//    userAnswer.setSubmittedAt(LocalDateTime.now());
//    userAnswer.setAnswer(answer);
//    return userAnswer;
//  }

//  @Transactional
//  protected void initializeUserTests() {
//    UserTest test1 = new UserTest();
//    test1.setIsDeleted(false);
//    test1.setResult(0.0);
//    test1.setCreatedAt(LocalDateTime.now());
//    test1.setId(1L);
//    test1.setShareTest(shareTestRepository.getReferenceById(1L));
//
//    UserTest test2 = new UserTest();
//    test2.setIsDeleted(false);
//    test2.setResult(50.0);
//    test2.setCreatedAt(LocalDateTime.now());
//    test2.setId(2L);
//    test2.setShareTest(shareTestRepository.getReferenceById(2L));
//
//    UserTest test3 = new UserTest();
//    test3.setIsDeleted(false);
//    test3.setResult(0.0);
//    test3.setCreatedAt(LocalDateTime.now());
//    test3.setId(3L);
//    test3.setShareTest(shareTestRepository.getReferenceById(3L));
//
//    userTestRepository.saveAll(List.of(test1, test2, test3));
//  }

//게시판 영역

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
    category6.setDepth(2);
    category6.setIsDeleted(false);
    category6.setId(6L);
    category6.setCreatedAt(LocalDateTime.now());
    category6.setParent(category2);
    category6.setName("코스웨어/문항");

    Category category7 = new Category();
    category7.setDepth(2);
    category7.setIsDeleted(false);
    category7.setId(7L);
    category7.setCreatedAt(LocalDateTime.now());
    category7.setParent(category2);
    category7.setName("서비스 이용");

    Category category8 = new Category();
    category8.setDepth(2);
    category8.setIsDeleted(false);
    category8.setId(8L);
    category8.setCreatedAt(LocalDateTime.now());
    category8.setParent(category2);
    category8.setName("시험지 배포");

    Category category9 = new Category();
    category9.setDepth(2);
    category9.setIsDeleted(false);
    category9.setId(9L);
    category9.setCreatedAt(LocalDateTime.now());
    category9.setParent(category2);
    category9.setName("리포트");

    categoryRepository.saveAll(List.of(category1, category2, category3, category4, category5, category6, category7, category8, category9));
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

    Board board6 = new Board();
    board6.setIsDeleted(false);
    board6.setCategory(categoryRepository.getReferenceById(1L));
    board6.setCreatedAt(LocalDateTime.now());
    board6.setTitle("\n" +
            "10/5(목) 17:00~18:00 시스템 점검 안내");
    board6.setContent("안녕하세요. 지니아튜터 관리자입니다.\n" +
            "\n" +
            "지니아튜터를 이용해 주시는 사용자분들께 감사드리며,  \n" +
            "\n" +
            "안정적인 서비스를 위하여 목요일(10/5) 오후 5시부터 일부 기능 업데이트 작업을 진행합니다.\n" +
            "\n" +
            "아래 작업 시간 동안에는 사이트 이용이 원활하지 않는 점 안내 드립니다.\n" +
            "\n" +
            "------------------------------------------------------------------------------------------------------------------------------\n" +
            "\n" +
            "<시스템 점검 안내>\n" +
            "\n" +
            "■ 작업일시 :  2023.10.05(목) 17:00 ~ 18:00     \n" +
            "\n" +
            "■ 작업내용 :  기능 개선을 위한 시스템 점검 작업\n" +
            "\n" +
            "------------------------------------------------------------------------------------------------------------------------------\n" +
            "\n" +
            "사이트 이용에 불편을 드리게 된 점 양해 부탁드리며, 안정된 서비스 제공을 위해 최선을 다하겠습니다.\n" +
            "\n" +
            "감사합니다.");

    Board board7 = new Board();
    board7.setIsDeleted(false);
    board7.setCategory(categoryRepository.getReferenceById(1L));
    board7.setCreatedAt(LocalDateTime.now());
    board7.setTitle("\n" +
            "11/30(목) 17시~18시 시스템 점검 안내");
    board7.setContent("안녕하세요. 지니아튜터 관리자입니다.\n" +
            "\n" +
            "지니아튜터의 연동 사이트가 시스템 점검을 진행하여 일부 기능이 작동하지 않을 수 있음을 알려드립니다.\n" +
            "\n" +
            "아래 작업 시간 동안에는 사이트 이용이 원활하지 않는 점 안내 드립니다.\n" +
            "\n" +
            "------------------------------------------------------------------------------------------------------------------------------\n" +
            "\n" +
            "<시스템 점검 안내>\n" +
            "\n" +
            "■ 작업일시 : 2023.11.30(목) 17:00 ~ 18:00\n" +
            "\n" +
            "■ 작업내용 : 연동 사이트의 시스템 점검 작업\n" +
            "\n" +
            "------------------------------------------------------------------------------------------------------------------------------\n" +
            "\n" +
            "사이트 이용에 불편을 드리게 된 점 양해 부탁드리며, 안정된 서비스 제공을 위해 최선을 다하겠습니다.\n" +
            "\n" +
            "감사합니다.");

    Board board8 = new Board();
    board8.setIsDeleted(false);
    board8.setCategory(categoryRepository.getReferenceById(7L));
    board8.setCreatedAt(LocalDateTime.now());
    board8.setTitle("학교에서 유료버전 신청하고자 합니다. 가격이 어떻게 되나요?");
    board8.setContent("기본 가격은 10,000원/학생1인, 1개월 기준이며\n" +
            "\n" +
            "신청(학생)인원이 30명이 넘거나 선도학교의 경우에는 7,000원/학생1인, 1개월 입니다.\n" +
            "\n" +
            " \n" +
            "\n" +
            "학교마다 학생수, 예산 등 다양한 환경이 존재하므로 자세한 내용은 영업담당자와 협의해 주시기 바랍니다. \n" +
            "\n" +
            "영업담당자 정보는 아래와 같습니다.\n" +
            "담당자: 정대욱\n" +
            "연락처: 010-7562-7488 / daewook86@chunjae.co.kr");

    Board board9 = new Board();
    board9.setIsDeleted(false);
    board9.setCategory(categoryRepository.getReferenceById(6L));
    board9.setCreatedAt(LocalDateTime.now());
    board9.setTitle("평가 당 문항수는 몇개씩 인가요?");
    board9.setContent("지니아튜터가 제공하는 평가는 진단평가, 형성평가, 단원평가 등입니다.\n" +
            "제공하는 문항 수는 진단평가는 10문항, 형성평가는 5문항, 단원평가는 20문항입니다.\n" +
            "\n" +
            "다만, 선생님은 문항수를 조정하실 수 있습니다.\n" +
            "\n" +
            "문항편집 기능을 이용하여 문항을 추가하거나 삭제하면 문항수 조정됩니다.");

    Board board10 = new Board();
    board10.setIsDeleted(false);
    board10.setCategory(categoryRepository.getReferenceById(8L));
    board10.setCreatedAt(LocalDateTime.now());
    board10.setTitle("배포 취소는 언제나 가능한 건가요?");
    board10.setContent("선생님이 원하시면 배포취소는 언제든지 하실 수 있습니다.\n" +
            "다만 배포취소를 할 경우에 학생들이 푼 학습결과와 리포트는 모두 사라지게 됩니다.");

    boardRepository.saveAll(List.of(board1, board2, board3, board4, board5, board6, board7,
            board8, board9, board10));
  }

}
