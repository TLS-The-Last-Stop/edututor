package com.tls.edututor.common.initilizer;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.codegroup.repository.CodeGroupRepository;
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
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class DataInitializer {

  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;
  private final SchoolRepository schoolRepository;
  private final ClassroomRepository classroomRepository;

  public DataInitializer(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, SchoolRepository schoolRepository, ClassroomRepository classroomRepository) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.schoolRepository = schoolRepository;
    this.classroomRepository = classroomRepository;
  }

  @Bean
  public ApplicationRunner initializer(CodeGroupRepository codeGroupRepository, CodeDetailRepository codeDetailRepository) {
    return args -> {
      if (codeGroupRepository.count() > 0) {
        return;
      }

      initAll();

      AtomicInteger codeGroupIdCounter = new AtomicInteger(1);

      List<String> levels = Arrays.asList("초등학교", "중학교", "고등학교");
      List<String> elementaryYears = Arrays.asList("1학년", "2학년", "3학년", "4학년", "5학년", "6학년");
      List<String> middleHighYears = Arrays.asList("1학년", "2학년", "3학년");
      List<String> semesters = Arrays.asList("1학기", "2학기");
      List<String> subjects = Arrays.asList("국어", "수학", "영어", "사회", "과학", "역사", "도덕");

      levels.forEach(level -> {
        List<String> applicableYears = level.equals("초등학교") ? elementaryYears : middleHighYears;
        applicableYears.forEach(year -> {
          semesters.forEach(semester -> {
            subjects.forEach(subject -> {
              int codeGroupId = codeGroupIdCounter.getAndIncrement();
              CodeGroup codeGroup = codeGroupRepository.save(
                      new CodeGroup(null, "과정코드그룹-" + codeGroupId, null));
              codeDetailRepository.saveAll(Arrays.asList(
                      new CodeDetail(null, 1001, codeGroupId, subject, codeGroup),
                      new CodeDetail(null, 1002, codeGroupId, semester, codeGroup),
                      new CodeDetail(null, 1003, codeGroupId, year, codeGroup),
                      new CodeDetail(null, 1004, codeGroupId, level, codeGroup)
              ));
            });
          });
        });
      });
    };
  }

  @Transactional
  protected void initAll() {
    initializeSchools();
    initializeClassrooms();
    initializeTeachers();
  }

  @Transactional
  protected void initializeSchools() {
    String[] classname = {"수완반", "두완반", "수완여자친구반"};
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
    String[] classroomName = {"수완", "두완", "카리나"};
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
    String[] studentBaseNames = {"이수완", "이두완", "카리나"};
    String[] loginIdPrefixes = {"suwan", "duwan", "karina"};
    String[] passwordBase = {"suwan12!@", "duwan12!@", "karina12!@"};

    // 각 반마다 3명의 학생 생성
    for (int studentNum = 1; studentNum <= 3; studentNum++) {
      UserTERequest userTERequest = new UserTERequest();

      // fullName: "이수완학생1", "이수완학생2", "이수완학생3"
      userTERequest.setFullName(studentBaseNames[idx] + "학생" + studentNum);

      // loginId: "suwan_student1", "suwan_student2", "suwan_student3"
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
