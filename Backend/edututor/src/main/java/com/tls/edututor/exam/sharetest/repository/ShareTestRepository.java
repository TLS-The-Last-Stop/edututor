package com.tls.edututor.exam.sharetest.repository;

import com.tls.edututor.exam.sharetest.entity.ShareTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShareTestRepository extends JpaRepository<ShareTest, Long> {

  Optional<ShareTest> findByUserIdAndTestPaperId(Long userId, Long testPaperId);

  long countByTestPaperId(Long testPaperId);
}
