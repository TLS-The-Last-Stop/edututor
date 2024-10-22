package com.tls.edututor.course.course.service;

import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.entity.Course;

public interface CourseService {

  Course createCourseWithSectionsAndUnits(CourseRegisterRequest request);
}
