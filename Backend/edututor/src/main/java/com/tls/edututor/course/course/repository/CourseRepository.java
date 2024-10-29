package com.tls.edututor.course.course.repository;

import com.tls.edututor.course.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByGroupCodeIdIn(List<Long> groupCodeIds);
  }