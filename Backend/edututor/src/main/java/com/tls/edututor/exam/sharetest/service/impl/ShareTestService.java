package com.tls.edututor.exam.sharetest.service.impl;

import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
import com.tls.edututor.exam.sharetest.service.ShareTestServiceImpl;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.user.dto.response.AuthUser;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ShareTestService implements ShareTestServiceImpl {

  private final ShareTestRepository shareTestRepository;
  private final TestPaperRepository testPaperRepository;
  private final UserRepository userRepository;

  @Override
  @Transactional
  public Long saveShareTest(ShareTestRequest shareTestRequest, Authentication authentication) {
    AuthUser teacher = (AuthUser) authentication.getPrincipal();
    TestPaper testPaper = testPaperRepository.findById(shareTestRequest.getUnitId()).orElseThrow(() -> new IllegalArgumentException("없는 시험지입니다."));

    for (Long studentId : shareTestRequest.getStudentId()) {
      User student = userRepository.findById(studentId).orElseThrow(() -> new IllegalArgumentException("없는 학생입니다."));

      ShareTest shareTest = ShareTest.builder()
              .user(student)
              .testPaper(testPaper)
              .deadline(shareTestRequest.getDeadline())
              .build();

      //shareTest.setWriter(teacher.getId());

      shareTestRepository.save(shareTest);
    }
    return 0L;
  }
}
