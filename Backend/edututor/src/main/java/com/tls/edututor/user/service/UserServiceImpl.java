package com.tls.edututor.user.service;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.common.exception.DuplicateUserException;
import com.tls.edututor.school.entity.School;
import com.tls.edututor.school.repository.SchoolRepository;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
    return userRepository.findByLoginId(loginId).isPresent();
  }

  @Transactional
  public Long saveUser(UserTERequest request) {
    if (userRepository.existsByLoginId(request.getLoginId())) {
      throw new DuplicateUserException(String.format("이미 {}로 회원가입이 되어있습니다.", request.getLoginId()));
    }

    request.setPassword(passwordEncoder.encode(request.getPassword()));

    User user = User.withDto()
            .dto(request)
            .build();

    School school = School.withDto()
            .request(request.getSchool())
            .build();

    Classroom classroom = Classroom.withDto()
            .request(request.getClassroom())
            .type(school.getType())
            .build();

    schoolRepository.save(school);
    classroomRepository.save(classroom);

    return userRepository.save(user).getId();
  }

}
