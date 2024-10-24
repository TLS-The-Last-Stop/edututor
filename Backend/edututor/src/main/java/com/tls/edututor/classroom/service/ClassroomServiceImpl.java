package com.tls.edututor.classroom.service;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClassroomServiceImpl implements ClassroomService {

  private final ClassroomRepository classroomRepository;

  @Override
  public Long save(ClassroomRequest request) {
    Classroom classroom = Classroom.withDto()
            .request(request)
            .build();
    return classroomRepository.save(classroom).getId();
  }
}
