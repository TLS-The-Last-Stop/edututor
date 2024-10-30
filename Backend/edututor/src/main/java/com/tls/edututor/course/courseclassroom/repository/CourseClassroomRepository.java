package com.tls.edututor.course.courseclassroom.repository;

import com.tls.edututor.course.course.entity.CourseClassroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseClassroomRepository extends JpaRepository<CourseClassroom, Long> {
  boolean existsByCourseIdAndClassroomId(Long courseId, Long classroomId);

  @Query("SELECT c.course.id FROM CourseClassroom c WHERE c.classroom.id = :classroomId")
  List<Long> findCourseIdsByClassroomId(@Param("classroomId") Long classroomId);
}