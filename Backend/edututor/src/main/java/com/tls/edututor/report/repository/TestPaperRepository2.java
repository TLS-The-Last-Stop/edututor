package com.tls.edututor.report.repository;

import com.tls.edututor.exam.testpaper.entity.TestPaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface TestPaperRepository2 extends JpaRepository<TestPaper, Long> {
  @Query("SELECT tp FROM TestPaper tp " +
          "JOIN FETCH tp.unit u " +
          "JOIN FETCH u.section s " +
          "JOIN FETCH s.course c " +
          "WHERE u.section.course.id IN :courseIds " +
          "AND tp.isDeleted = false")
  Page<TestPaper> findByUnitCourseIdInAndIsDeletedFalse(Collection<Long> courseIds, Pageable pageable);

  @Query("SELECT tp FROM TestPaper tp " +
          "JOIN FETCH tp.unit u " +
          "JOIN FETCH u.section s " +
          "WHERE tp.unit.id = :unitId")
  TestPaper findByUnitId(Long unitId);
}