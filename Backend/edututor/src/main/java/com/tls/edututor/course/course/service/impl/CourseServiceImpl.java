package com.tls.edututor.course.course.service.impl;

import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.entity.Course;
import com.tls.edututor.course.course.repository.CourseRepository;
import com.tls.edututor.course.course.service.CourseService;
import com.tls.edututor.course.section.dto.request.SectionRegisterRequest;
import com.tls.edututor.course.section.entity.Section;
import com.tls.edututor.course.section.repository.SectionRepository;
import com.tls.edututor.course.unit.dto.request.UnitRegisterRequest;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

	private final ClassroomRepository classroomRepository;
	private final CourseRepository courseRepository;
	private final SectionRepository sectionRepository;
	private final UnitRepository unitRepository;
	private final CodeDetailRepository codeDetailRepository;

	@Override
	@Transactional
	public Course createCourseWithSectionsAndUnits(CourseRegisterRequest request) {

		Course course = new Course();
		course.setWriter(request.getWriter());
		Course savedCourse = courseRepository.save(course);

		for (SectionRegisterRequest sectionRegister : request.getSections()) {
			Section section = new Section();
			section.setCourse(savedCourse);
			section.setContent(sectionRegister.getContent());
			section.setWriter(sectionRegister.getWriter());
			Section savedSection = sectionRepository.save(section);

			for (UnitRegisterRequest unitRegister : sectionRegister.getUnits()) {
				Unit unit = new Unit();
				unit.setSection(savedSection);
				unit.setContent(unitRegister.getContent());
				unit.setWriter(unitRegister.getWriter());
				unitRepository.save(unit);
			}
		}

		return savedCourse;
	}

	@Override
	public List<CourseNameListResponse> selectAllCourseList() {
		return courseRepository.findAll().stream()
						.map(course -> new CourseNameListResponse(course.getId(), course.getCourseName()))
						.collect(Collectors.toList());
	}

	@Override
	public List<Map<String, String>> getCourseDetails(String codeId) {
		List<Object[]> results = courseRepository.findCourseDetailsByCodeId(codeId);

		return results.stream()
						.map(result -> {
							Map<String, String> map = new HashMap<>();
							map.put("codeDetailValue", result[0].toString());
							map.put("id", result[1].toString());
							return map;
						})
						.collect(Collectors.toList());
	}


}
