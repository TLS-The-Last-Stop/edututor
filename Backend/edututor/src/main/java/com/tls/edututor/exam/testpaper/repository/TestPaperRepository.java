package com.tls.edututor.exam.testpaper.repository;

import com.tls.edututor.exam.testpaper.entity.TestPaper;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestPaperRepository extends JpaRepository<TestPaper, Long> {
}
