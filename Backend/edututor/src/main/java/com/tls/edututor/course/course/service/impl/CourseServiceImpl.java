package com.tls.edututor.course.course.service.impl;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.classroom.repository.ClassroomRepository;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.codegroup.repository.CodeGroupRepository;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
import com.tls.edututor.course.course.dto.response.CourseFilterResponse;
import com.tls.edututor.course.course.dto.response.CourseNameListResponse;
import com.tls.edututor.course.course.dto.response.CourseResponse;
import com.tls.edututor.course.course.entity.Course;
import com.tls.edututor.course.course.entity.CourseClassroom;
import com.tls.edututor.course.course.repository.CourseRepository;
import com.tls.edututor.course.course.service.CourseService;
import com.tls.edututor.course.courseclassroom.repository.CourseClassroomRepository;
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
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

  private final CourseClassroomRepository courseClassroomRepository;
  private final CourseRepository courseRepository;
  private final SectionRepository sectionRepository;
  private final UnitRepository unitRepository;
  private final CodeGroupRepository codeGroupRepository;
  private final CodeDetailRepository codeDetailRepository;

  @Override
  @Transactional
  public Course createCourseWithSectionsAndUnits(CourseRegisterRequest request) {
    Course course = buildCourse(request);
    Course savedCourse = courseRepository.save(course);

    for (SectionRegisterRequest sectionRegister : request.getSections()) {
      Section section = buildSection(savedCourse, sectionRegister);
      Section savedSection = sectionRepository.save(section);

      for (UnitRegisterRequest unitRegister : sectionRegister.getUnits()) {
        Unit unit = buildUnit(savedSection, unitRegister);
        unitRepository.save(unit);
      }
    }

    return savedCourse;
  }

  private Course buildCourse(CourseRegisterRequest request) {
    String groupCode = request.getGroupCode();
    String[] parts = groupCode.split("-");
    if (parts.length != 4) {
      throw new IllegalArgumentException("데이터가 맞지 않음 급수-학년-학기-과목");
    }

    List<String> names = List.of(parts[0], parts[1], parts[2], parts[3]);
    long count = names.size();

    Long codeGroupId = codeDetailRepository.findCodeGroupIdByCommonCodeNames(names, count)
            .orElseThrow(() -> new RuntimeException("해당 groupCode에 해당하는 공통 코드 그룹이 존재하지 않음: " + groupCode));

    CodeGroup codeGroup = codeGroupRepository.findById(codeGroupId)
            .orElseThrow(() -> new RuntimeException("해당 그룹 ID에 해당하는 CodeGroup이 존재하지 않음: " + codeGroupId));

    return Course.builder()
            .courseName(request.getCourseName())
            .groupCode(codeGroup)
            .build();
  }


  private Section buildSection(Course course, SectionRegisterRequest sectionRegister) {
    return Section.builder().course(course).content(sectionRegister.getContent()).build();
  }

  private Unit buildUnit(Section section, UnitRegisterRequest unitRegister) {
    return Unit.builder().section(section).content(unitRegister.getContent()).build();
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
	@Transactional
	public void updateCourse(Long courseId, CourseRegisterRequest request) {
		Course course = courseRepository.findById(courseId)
						.orElseThrow(() -> new RuntimeException("해당 과정이 존재하지 않습니다."));

		course.setCourseName(request.getCourseName());

		sectionRepository.deleteAll(course.getSections());
		course.setSections(null);

		for (SectionRegisterRequest sectionRegister : request.getSections()) {
			Section section = buildSection(course, sectionRegister);
			Section savedSection = sectionRepository.save(section);

			for (UnitRegisterRequest unitRegister : sectionRegister.getUnits()) {
				Unit unit = buildUnit(savedSection, unitRegister);
				unitRepository.save(unit);
			}
		}

		courseRepository.save(course);
	}

	@Override
	@Transactional
	public void deleteCourse(Long courseId) {
		Course course = courseRepository.findById(courseId)
						.orElseThrow(() -> new RuntimeException("해당 과정이 존재하지 않습니다."));
		courseRepository.delete(course);
	}

  @Override
  public List<CourseNameListResponse> getClassroomCourses(Authentication authentication) {
    Long classroomId = ((AuthUser) authentication.getPrincipal()).getClassroom().getId();
    List<Long> courseIds = courseClassroomRepository.findCourseIdsByClassroomId(classroomId);
    List<Course> courses = courseRepository.findByIdIn(courseIds);
    return courses.stream()
            .map(course -> new CourseNameListResponse(
                    course.getId(),
                    course.getCourseName()
            ))
            .collect(Collectors.toList());
  }
  @Override
  public List<CourseNameListResponse> getFilteredCourses(String gradeLevel, String year, String semester, String subject, Authentication authentication) {
    List<Long> groupCodeIds = codeDetailRepository.findGroupCodeIdsByDetails(gradeLevel, year, semester, subject);
    List<Course> courses = courseRepository.findByGroupCodeIdIn(groupCodeIds);
    ((AuthUser) authentication.getPrincipal()).getClassroom();
    return courses.stream().map(course -> new CourseNameListResponse(
            course.getId(),
            course.getCourseName()
    )).collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void enrollCourseInClassroom(Long courseId, Authentication authentication) {
    Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new IllegalArgumentException("courseId 틀림"));
    AuthUser authUser = (AuthUser) authentication.getPrincipal();
    authUser.getId();
    Classroom classroom = ((AuthUser) authentication.getPrincipal()).getClassroom();
    boolean exists = courseClassroomRepository.existsByCourseIdAndClassroomId(courseId, classroom.getId());
    if (exists) {
      throw new IllegalStateException("이미 등록된 과정입니다.");
    }

    CourseClassroom courseClassroom = new CourseClassroom();
    courseClassroom.setCourse(course);
    courseClassroom.setClassroom(classroom);

    courseClassroomRepository.save(courseClassroom);
  }
}
