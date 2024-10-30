package com.tls.edututor.common.initilizer;

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
import com.tls.edututor.school.dto.request.SchoolRequest;
import com.tls.edututor.school.entity.School;
import com.tls.edututor.school.repository.SchoolRepository;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

  public DataInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
                         SchoolRepository schoolRepository, ClassroomRepository classroomRepository,
                         CourseRepository courseRepository, CourseClassroomRepository courseClassroomRepository,
                         SectionRepository sectionRepository, UnitRepository unitRepository,
                         MaterialRepository materialRepository, TestPaperRepository testPaperRepository,
                         ShareTestRepository shareTestRepository, QuestionRepository questionRepository,
                         OptionRepository optionRepository, CodeGroupRepository codeGroupRepository, CodeDetailRepository codeDetailRepository) {
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
  }

  @Bean
  public ApplicationRunner initializer() {
    return args -> {
      if (codeGroupRepository.count() > 0 || courseRepository.count() > 0) {
        return;
      }

      initAll();

      List<String> courses = List.of("초등학교 국어 1학년 교과서", "초등학교 수학 1학년 참고서", "영어의 정석 참고서", "이것이 과학이다 교과서");

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
                    .user(userRepository.findById(1L).orElseThrow())
                    .testPaper(testPaper)
                    .build();
            shareTestRepository.save(shareTest);

            for (int i = 1; i <= 5; i++) {
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
                        .build();
                questionRepository.save(question2);
              }
            }
          });
        });
      });
    };
  }



  @Transactional
  protected void initAll() {
    if(codeGroupRepository.count() == 0){
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
      school.setWriter(Long.valueOf(i) + 1);
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

      classroom.setWriter(Long.valueOf(i) + 1);
      classroomRepository.save(classroom);
    }
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
      teacher.setWriter(Long.valueOf(i) + 1);
      userRepository.save(teacher);

      teacher.setClassroom(classroom);
      userRepository.save(teacher);

      initStudents(classroom, i);
    }
  }

  @Transactional
  protected void initStudents(Classroom classroom, int idx) {
    String[] studentBaseNames = {"이수완", "김혁진", "한유리"};
    String[] loginIdPrefixes = {"suwan", "gurwls", "dbfl"};
    String[] passwordBase = {"suwan12!@", "gurwls!@", "dbfl!@"};

    for (int studentNum = 1; studentNum <= 3; studentNum++) {
      UserTERequest userTERequest = new UserTERequest();

      userTERequest.setFullName(studentBaseNames[idx] + "학생" + studentNum);
      userTERequest.setLoginId(loginIdPrefixes[idx] + "_" + studentNum);
      userTERequest.setPassword(passwordEncoder.encode(passwordBase[idx]));
      userTERequest.setType("SU");

      User student = User.createTeacher(userTERequest);
      student.setWriter(classroom.getId());
      userRepository.save(student);

      student.setClassroom(classroom);
      userRepository.save(student);
    }
  }
}
