package com.tls.edututor.course.course.service.impl;

import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.code.repository.CodeDetailRepository;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.entity.Course;
import com.tls.edututor.course.course.repository.CourseRepository;
import com.tls.edututor.course.course.service.CourseService;
import com.tls.edututor.course.material.dto.response.MaterialResponse;
import com.tls.edututor.course.section.dto.request.SectionRegisterRequest;
import com.tls.edututor.course.section.dto.response.SectionResponse;
import com.tls.edututor.course.section.entity.Section;
import com.tls.edututor.course.section.repository.SectionRepository;
import com.tls.edututor.course.unit.dto.request.UnitRegisterRequest;
import com.tls.edututor.course.unit.dto.response.UnitResponse;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
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
    course.setCourseName(request.getCourseName());
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
            .map(course -> CourseNameListResponse.builder()
                    .courseId(course.getId())
                    .courseName(course.getCourseName())
                    .build())
            .toList();
  }

  public CourseResponse selectCourseDetails(Long courseId) {
    Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("해당 과정이 존재하지 않습니다."));

    List<SectionResponse> sections = course.getSections().stream()
            .map(section -> SectionResponse.builder()
                    .sectionId(section.getId())
                    .content(section.getContent())
                    .units(section.getUnits().stream()
                            .map(unit -> UnitResponse.builder()
                                    .unitId(unit.getId())
                                    .content(unit.getContent())
                                    .materials(unit.getMaterials().stream()
                                            .map(material -> MaterialResponse.builder()
                                                    .materialId(material.getId())
                                                    .title(material.getTitle())
                                                    .content(material.getContent())
                                                    .build())
                                            .collect(Collectors.toList()))
                                    .testPaper(unit.getTestPaper() != null
                                            ? TestPaperResponse.builder()
                                            .testPaperId(unit.getTestPaper().getId())
                                            .title(unit.getTestPaper().getTitle())
                                            .build()
                                            : null)
                                    .build())
                            .collect(Collectors.toList()))
                    .build())
            .collect(Collectors.toList());

    return CourseResponse.builder()
            .courseId(course.getId())
            .courseName(course.getCourseName())
            .sections(sections)
            .build();
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
