package com.tls.edututor.course.course.repository;

import com.tls.edututor.course.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
