package com.tls.edututor.school.service;

import com.tls.edututor.school.dto.request.SchoolRequest;
import com.tls.edututor.school.entity.School;
import com.tls.edututor.school.repository.SchoolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SchoolServiceImpl implements SchoolService {

  private final SchoolRepository schoolRepository;

  @Transactional
  @Override
  public Long save(SchoolRequest request) {
    School school = School.withDto()
            .request(request)
            .build();
    return schoolRepository.save(school).getId();
  }
}
