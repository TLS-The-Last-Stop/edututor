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

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ShareTestService implements ShareTestServiceImpl {

  private final ShareTestRepository shareTestRepository;
  private final TestPaperRepository testPaperRepository;
  private final UserRepository userRepository;

  @Override
  public void saveShareTest(ShareTestRequest shareTestRequest, Authentication authentication) {
    TestPaper testPaper = testPaperRepository.findById(shareTestRequest.getUnitId()).orElseThrow(() -> new IllegalArgumentException("없는 시험지입니다."));

    for (Long studentId : shareTestRequest.getStudentId()) {
      User student = userRepository.findById(studentId).orElseThrow(() -> new IllegalArgumentException("없는 학생입니다."));

      Optional<ShareTest> existingShared = shareTestRepository.findByUserIdAndTestPaperId(student.getId(), testPaper.getId());

      if (existingShared.isEmpty()) {
        ShareTest shareTest = ShareTest.builder()
                .user(student)
                .testPaper(testPaper)
                .build();

        shareTestRepository.save(shareTest);
      }
    }
  }

  @Override
  public void deleteShareTest(ShareTestRequest shareTestRequest, Authentication authentication) {
    TestPaper testPaper = testPaperRepository.findById(shareTestRequest.getUnitId()).orElseThrow(() -> new IllegalArgumentException("없는 시험지입니다."));

    for (Long studentId : shareTestRequest.getStudentId()) {
      User student = userRepository.findById(studentId).orElseThrow(() -> new IllegalArgumentException("없는 학생입니다."));

      ShareTest shareTest = shareTestRepository.findByUserIdAndTestPaperId(student.getId(), testPaper.getId())
              .orElseThrow(() -> new IllegalArgumentException("공유되지 않은 시험입니다."));

      shareTestRepository.delete(shareTest);
    }

  }
}
