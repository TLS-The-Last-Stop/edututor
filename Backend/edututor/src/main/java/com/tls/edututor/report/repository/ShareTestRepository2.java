package com.tls.edututor.report.repository;

import com.tls.edututor.exam.sharetest.entity.ShareTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareTestRepository2 extends JpaRepository<ShareTest, Long> {
  long countByTestPaperId(Long testPaperId);
}