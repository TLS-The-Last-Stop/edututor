package com.tls.edututor.report.repository;

import com.tls.edututor.course.course.entity.CourseClassroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseClassroomRepository2 extends JpaRepository<CourseClassroom, Long> {
  @Query("SELECT cc FROM CourseClassroom cc JOIN FETCH cc.course WHERE cc.classroom.id = :classroomId")
  List<CourseClassroom> findByClassroomId(Long classroom);
}