package com.tls.edututor.user.service.impl;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.user.dto.response.AuthUser;
import com.tls.edututor.user.exception.DuplicateUserException;
import com.tls.edututor.school.entity.School;
import com.tls.edututor.school.repository.SchoolRepository;
import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import com.tls.edututor.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

  private final BCryptPasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final SchoolRepository schoolRepository;
  private final ClassroomRepository classroomRepository;

  public boolean checkJoinAvailable(String loginId) {
    return userRepository.findByLoginIdAndIsDeleted(loginId, false).isPresent();
  }

  @Transactional
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

  @Transactional
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
}
