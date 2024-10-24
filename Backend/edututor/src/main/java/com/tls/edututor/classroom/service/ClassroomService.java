package com.tls.edututor.classroom.service;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;

public interface ClassroomService {
  Long save(ClassroomRequest request);
}
