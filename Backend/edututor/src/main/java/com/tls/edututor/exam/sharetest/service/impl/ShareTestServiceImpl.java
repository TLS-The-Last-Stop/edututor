package com.tls.edututor.exam.sharetest.service.impl;

import com.tls.edututor.exam.sharetest.dto.request.ShareTestRequest;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
import com.tls.edututor.exam.sharetest.service.ShareTestService;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.testpaper.repository.TestPaperRepository;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * 시험지 공유 서비스 구현 클래스입니다.
 *
 * 이 클래스는 시험지를 특정 학생들과 공유하거나, 공유된 시험지를 삭제하는 기능을 제공합니다.
 */
@Service
@RequiredArgsConstructor
@Transactional
public class ShareTestServiceImpl implements ShareTestService {

  private final ShareTestRepository shareTestRepository;
  private final TestPaperRepository testPaperRepository;
  private final UserRepository userRepository;

  /**
   * 시험지를 특정 학생들과 공유합니다.
   *
   * @param shareTestRequest 시험지 공유 요청 객체
   * @param authentication 인증된 사용자 정보
   * @throws IllegalArgumentException 존재하지 않는 시험지나 학생에 대한 예외 발생
   */
  @Override
  public void saveShareTest(ShareTestRequest shareTestRequest, Authentication authentication) {
    TestPaper testPaper = testPaperRepository.findById(shareTestRequest.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("없는 시험지입니다."));

    for (Long studentId : shareTestRequest.getStudentId()) {
      User student = userRepository.findById(studentId)
              .orElseThrow(() -> new IllegalArgumentException("없는 학생입니다."));

      Optional<ShareTest> existingShared = shareTestRepository.findByUserIdAndTestPaperId(student.getId(), testPaper.getId());

      // 이미 시험지를 공유한 학생이 아닌 경우에만 공유
      if (existingShared.isEmpty()) {
        ShareTest shareTest = ShareTest.builder()
                .user(student)
                .testPaper(testPaper)
                .build();

        shareTestRepository.save(shareTest);
      }
    }
  }

  /**
   * 이미 공유된 시험지를 학생들과의 공유 목록에서 삭제합니다.
   *
   * @param shareTestRequest 시험지 공유 삭제 요청 객체
   * @param authentication 인증된 사용자 정보
   * @throws IllegalArgumentException 존재하지 않는 시험지나 학생에 대한 예외 발생
   */
  @Override
  public void deleteShareTest(ShareTestRequest shareTestRequest, Authentication authentication) {
    TestPaper testPaper = testPaperRepository.findById(shareTestRequest.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("없는 시험지입니다."));

    for (Long studentId : shareTestRequest.getStudentId()) {
      User student = userRepository.findById(studentId)
              .orElseThrow(() -> new IllegalArgumentException("없는 학생입니다."));

      ShareTest shareTest = shareTestRepository.findByUserIdAndTestPaperId(student.getId(), testPaper.getId())
              .orElseThrow(() -> new IllegalArgumentException("공유되지 않은 시험입니다."));

      shareTestRepository.delete(shareTest);
    }
  }
}
