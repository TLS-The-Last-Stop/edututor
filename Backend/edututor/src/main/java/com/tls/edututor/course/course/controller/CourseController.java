package com.tls.edututor.course.course.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/course")
public class CourseController {

	private final CourseService courseService;

	@GetMapping
	public List<CourseNameListResponse> selectAllCourses() {
		return courseService.selectAllCourseList();
	}

	@PostMapping
	public CommonApiResponse<Void> createCourse(@RequestBody CourseRegisterRequest request) {
		courseService.createCourseWithSectionsAndUnits(request);
		return CommonApiResponse.createSuccessWithNoContent("등록 성공");
	}

	@GetMapping("/{codeId}")
	public CommonApiResponse<List<Map<String, String>>> getCourseDetails(@PathVariable String codeId) {
		System.out.println("codeId@@@@@@@@@@@@ = " + codeId);
		List<Map<String, String>> courseDetails = courseService.getCourseDetails(codeId);
		System.out.println("courseDetails = " + courseDetails.get(0));
		return CommonApiResponse.createCreated("courseDetails", courseDetails);
	}
}
