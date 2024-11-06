package com.tls.edututor.user.service.impl;

import com.tls.edututor.classroom.dto.response.ClassroomResponse;
import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.user.dto.response.AuthUser;
import com.tls.edututor.user.dto.response.UserResponse;
import com.tls.edututor.user.dto.response.UserSUResponse;
import com.tls.edututor.user.dto.response.UserTEResponse;
import com.tls.edututor.user.exception.DuplicateUserException;
import com.tls.edututor.school.entity.School;
import com.tls.edututor.school.repository.SchoolRepository;
import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import com.tls.edututor.user.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

  private final BCryptPasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final SchoolRepository schoolRepository;
  private final ClassroomRepository classroomRepository;

  @Override
  @Transactional(readOnly = true)
  public UserResponse findAllUser(Authentication authentication, int page) {
    AuthUser admin = (AuthUser) authentication.getPrincipal();
    if (!admin.getRole().equals("AD")) throw new IllegalArgumentException("권한이 없습니다.");

    PageRequest pageRequest = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "id"));
    Page<User> allUser = userRepository.findAll(pageRequest);

    UserResponse userResponse = new UserResponse();
    List<UserTEResponse> teachers = userResponse.getTeachers();
    List<UserSUResponse> students = userResponse.getStudents();

    for (User user : allUser.getContent()) {
      String role = user.getRole();
      if (role.equals("TE")) {
        ClassroomResponse classroomResponse = ClassroomResponse.from(user.getClassroom());
        UserTEResponse teacher = UserTEResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNum(user.getPhoneNum())
                .classroom(classroomResponse)
                .role(user.getRole())
                .build();
        teachers.add(teacher);
      } else if (role.equals("SU")) {
        ClassroomResponse classroomResponse = ClassroomResponse.from(user.getClassroom());
        UserSUResponse student = UserSUResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .classroomId(classroomResponse.getId())
                .loginId(user.getLoginId())
                .build();
        students.add(student);
      }
    }

    userResponse.setTeachers(teachers);
    userResponse.setStudents(students);

    return userResponse;
  }

  @Override
  @Transactional(readOnly = true)
  public boolean checkJoinAvailable(String loginId) {
    return userRepository.findByLoginIdAndIsDeleted(loginId, false).isPresent();
  }

  @Override
  public Long saveTeacher(UserTERequest request) {
    if (userRepository.existsByLoginIdAndIsDeleted(request.getLoginId(), false)) {
      throw new DuplicateUserException(String.format("이미 %s로 회원가입이 되어있습니다.", request.getLoginId()));
    }

    request.setPassword(passwordEncoder.encode(request.getPassword()));

    User user = User.createTeacher(request);
    userRepository.save(user).getId();

    School school = School.withDto()
            .request(request.getSchool())
            .build();
    //school.setWriter(user.getId());
    schoolRepository.save(school);

    Classroom classroom = Classroom.withDto()
            .request(request.getClassroom())
            .school(school)
            .type(school.getType())
            .build();
    //classroom.setWriter(user.getId());
    classroomRepository.save(classroom);

    user.setClassroom(classroom);
    //user.setWriter(user.getId());

    return user.getId();
  }


  @Override
  public Long saveStudent(UserSURequest request, Authentication authentication) {
    if (userRepository.existsByLoginIdAndIsDeleted(request.getLoginId(), false)) {
      throw new DuplicateUserException(String.format("이미 %s로 회원가입이 되어있습니다.", request.getLoginId()));
    }

    AuthUser teacher = (AuthUser) authentication.getPrincipal();
    Classroom classroom = classroomRepository.findById(request.getClassroom().getId()).orElseThrow(() -> new IllegalArgumentException("찾는 classroom이 없습니다."));

    request.setPassword(passwordEncoder.encode(request.getPassword()));

    User user = User.createStudent(request);
    user.setClassroom(classroom);
    //user.setWriter(request.getTeacherId());

    userRepository.save(user);

    return user.getId();
  }


  @Override
  public Long updateStudent(UserSURequest request, Long id) {
    User student = userRepository.findById(id).orElseThrow();
    String originalPassword = request.getPassword();

    if (originalPassword != null) request.setPassword(passwordEncoder.encode(originalPassword));

    student.updateStudent(request);

    userRepository.save(student);

    return student.getId();
  }


  @Override
  public Long deleteStudent(Long id) {
    User student = userRepository.findById(id).orElseThrow();
    student.setIsDeleted(true);

    userRepository.save(student);

    return student.getId();
  }

  @Override
  public Long updateInfo(UserTERequest request, HttpServletRequest req) {
    Cookie[] cookies = req.getCookies();
    String oauthUserId = "";
    for (Cookie cookie : cookies) {
      if (cookie.getName().startsWith("temp")) oauthUserId = cookie.getValue();
    }

    if (oauthUserId.isBlank()) throw new IllegalArgumentException("잘못된 접근입니다.");

    User user = userRepository.findById(Long.parseLong(oauthUserId)).orElseThrow();
    School school = School.withDto()
            .request(request.getSchool())
            .build();
    schoolRepository.save(school);

    Classroom classroom = Classroom.withDto()
            .request(request.getClassroom())
            .school(school)
            .type(school.getType())
            .build();
    classroomRepository.save(classroom);

    user.completeOAuthRegistration(classroom, request.getPhoneNum(), request.getBirthDay(), "TE");

    return 0L;
  }
}
