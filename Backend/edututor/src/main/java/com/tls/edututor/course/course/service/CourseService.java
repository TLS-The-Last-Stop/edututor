package com.tls.edututor.course.course.service;

import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.entity.Course;

import java.util.List;
import java.util.Map;

public interface CourseService {

  Course createCourseWithSectionsAndUnits(CourseRegisterRequest request);

  List<CourseNameListResponse> selectAllCourseList();

  CourseResponse selectCourseDetails(Long courseId);

	List<Map<String, String>> getCourseDetails(String codeId);
}
