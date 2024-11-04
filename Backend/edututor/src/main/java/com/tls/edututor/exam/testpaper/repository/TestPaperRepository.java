package com.tls.edututor.exam.testpaper.repository;

import com.tls.edututor.exam.testpaper.entity.TestPaper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface TestPaperRepository extends JpaRepository<TestPaper, Long> {
  @Query("SELECT tp FROM TestPaper tp " +
          "JOIN FETCH tp.unit u " +
          "JOIN FETCH u.section s " +
          "JOIN FETCH s.course c " +
          "WHERE u.section.course.id IN :courseIds " +
          "AND (:courseId IS NULL OR c.id = :courseId) " +
          "AND tp.isDeleted = false")
  Page<TestPaper> findByUnitCourseIdInAndIsDeletedFalse(Collection<Long> courseIds, Long courseId, Pageable pageable);

  @Query("SELECT tp FROM TestPaper tp " +
          "JOIN FETCH tp.unit u " +
          "JOIN FETCH u.section s " +
          "WHERE tp.unit.id = :unitId")
  TestPaper findByUnitId(Long unitId);
}
