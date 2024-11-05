package com.tls.edututor.course.course.service;

import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.entity.Course;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CourseService {

  Course createCourseWithSectionsAndUnits(CourseRegisterRequest request);

  List<CourseNameListResponse> selectAllCourseList();

  CourseResponse selectCourseDetails(Long courseId, Authentication authentication);

  void updateCourse(Long courseId, CourseRegisterRequest request);

  void deleteCourse(Long courseId);

  List<CourseNameListResponse> getClassroomCourses(Authentication authentication);

  List<CourseNameListResponse> getFilteredCourses(String gradeLevel, String year, String semester, String subject, Authentication authentication);

  void enrollCourseInClassroom(Long courseId,Authentication authentication);
}
