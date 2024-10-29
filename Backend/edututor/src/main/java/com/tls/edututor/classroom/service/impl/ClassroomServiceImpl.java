package com.tls.edututor.classroom.service.impl;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.classroom.service.ClassroomService;
import com.tls.edututor.user.dto.response.UserSTResponse;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ClassroomServiceImpl implements ClassroomService {

  private final ClassroomRepository classroomRepository;
  private final UserRepository userRepository;

  @Override
  public List<UserSTResponse> getAllStudent(Long classroomId) {
    List<User> students = userRepository.findByClassroomIdAndRole(classroomId, "SU");

    if (students.isEmpty()) {
      log.info("classroom Id {}의 학생이 없습니다.", classroomId);
      return Collections.emptyList();
    }

    return students.stream()
            .map(student -> UserSTResponse.builder()
                    .id(student.getId())
                    .studentLoginId(student.getLoginId())
                    .studentFullName(student.getFullName())
                    .build())
            .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public Long save(ClassroomRequest request) {
    Classroom classroom = Classroom.withDto()
            .request(request)
            .build();
    return classroomRepository.save(classroom).getId();
  }
}
