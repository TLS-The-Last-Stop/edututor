package com.tls.edututor.course.course.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.codegroup.repository.CodeGroupRepository;
import com.tls.edututor.course.course.dto.request.CourseRegisterRequest;
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
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.sharetest.repository.ShareTestRepository;
import com.tls.edututor.exam.testpaper.dto.response.TestPaperResponse;
import com.tls.edututor.exam.usertest.repository.UserTestRepository;
import com.tls.edututor.image.entity.Image;
import com.tls.edututor.user.dto.response.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 과정/단원/차수에 대한 비즈니스 로직 입니다.
 *
 */
@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

  private final CourseClassroomRepository courseClassroomRepository;
  private final CourseRepository courseRepository;
  private final SectionRepository sectionRepository;
  private final UnitRepository unitRepository;
  private final CodeGroupRepository codeGroupRepository;
  private final CodeDetailRepository codeDetailRepository;
  private final ShareTestRepository shareTestRepository;
  private final UserTestRepository userTestRepository;
  private final AmazonS3 amazonS3;

  @Value("${cloud.aws.s3.bucket}")
  private String bucketName;

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public Course createCourseWithSectionsAndUnits(Map<String, Object> request, MultipartFile imageFile) {
    Course course = buildCourseFromMap(request);
    Course savedCourse = courseRepository.save(course);

    if (imageFile != null && !imageFile.isEmpty()) {
      String imageUrl = uploadImageToS3(imageFile);
      Image image = Image.builder()
              .imageUrl(imageUrl)
              .course(savedCourse)
              .build();
      savedCourse.setImage(image);
    }

    List<Map<String, Object>> sections = (List<Map<String, Object>>) request.get("sections");
    for (Map<String, Object> sectionMap : sections) {
      Section section = buildSectionFromMap(savedCourse, sectionMap);
      sectionRepository.save(section);

      List<Map<String, Object>> units = (List<Map<String, Object>>) sectionMap.get("units");
      for (Map<String, Object> unitMap : units) {
        Unit unit = buildUnitFromMap(section, unitMap);
        unitRepository.save(unit);
      }
    }

    return savedCourse;
  }

  /**
   * Map 데이터를 Course 객체로 변환하는 메서드입니다.
   *
   * @param map 강좌 데이터를 포함한 Map 객체입니다.
   * @return 변환된 Course 객체입니다.
   * @throws IllegalArgumentException groupCode 형식이 잘못된 경우 발생합니다.
   * @throws RuntimeException groupCode에 해당하는 코드 그룹이 없을 경우 발생합니다.
   */
  private Course buildCourseFromMap(Map<String, Object> map) {
    String groupCode = (String) map.get("groupCode");
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
            .courseName((String) map.get("courseName"))
            .groupCode(codeGroup)
            .build();
  }

  /**
   * Map 데이터를 Section 객체로 변환하는 메서드입니다.
   *
   * @param course Section이 속한 Course 객체입니다.
   * @param map Section 데이터를 포함한 Map 객체입니다.
   * @return 변환된 Section 객체입니다.
   */
  private Section buildSectionFromMap(Course course, Map<String, Object> map) {
    return Section.builder()
            .course(course)
            .content((String) map.get("content"))
            .build();
  }

  /**
   * Map 데이터를 Unit 객체로 변환하는 메서드입니다.
   *
   * @param section Unit이 속한 Section 객체입니다.
   * @param map Unit 데이터를 포함한 Map 객체입니다.
   * @return 변환된 Unit 객체입니다.
   */
  private Unit buildUnitFromMap(Section section, Map<String, Object> map) {
    return Unit.builder()
            .section(section)
            .content((String) map.get("content"))
            .build();
  }

  /**
   * AWS S3 버킷에 이미지를 업로드하는 메서드입니다.
   *
   * @param file 업로드할 이미지 파일입니다.
   * @return 업로드된 이미지 URL입니다.
   * @throws RuntimeException 업로드 실패 시 발생합니다.
   */
  private String uploadImageToS3(MultipartFile file) {
    String fileName = "images/" + UUID.randomUUID() + "_" + file.getOriginalFilename();
    try {
      amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), null)
              .withCannedAcl(CannedAccessControlList.PublicRead));
      return amazonS3.getUrl(bucketName, fileName).toString();
    } catch (IOException e) {
      throw new RuntimeException("S3에 이미지 업로드 실패", e);
    }
  }

  private Section buildSection(Course course, SectionRegisterRequest sectionRegister) {
    return Section.builder().course(course).content(sectionRegister.getContent()).build();
  }

  private Unit buildUnit(Section section, UnitRegisterRequest unitRegister) {
    return Unit.builder().section(section).content(unitRegister.getContent()).build();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<CourseNameListResponse> selectAllCourseList() {
    return courseRepository.findAll().stream()
            .map(course -> CourseNameListResponse.builder()
                    .courseId(course.getId())
                    .courseName(course.getCourseName())
                    .subject(course.getGroupCode().getCodeDetails().get(0).getCommonCodeName())
                    .build())
            .toList();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public CourseResponse selectCourseDetails(Long courseId, Authentication authentication) {
    Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("해당 과정이 존재하지 않습니다."));
    Long userId = ((AuthUser) authentication.getPrincipal()).getId();

    List<SectionResponse> sections = course.getSections().stream()
            .map(section -> SectionResponse.builder()
                    .sectionId(section.getId())
                    .content(section.getContent())
                    .units(section.getUnits().stream()
                            .map(unit -> {
                              int testPaperStatus = 0;  // 기본값 0
                              Long testPaperId = unit.getTestPaper() != null ? unit.getTestPaper().getId() : null;

                              if (testPaperId != null) {
                                Optional<ShareTest> shareTestOptional = shareTestRepository.findByUserIdAndTestPaperId(userId, testPaperId);
                                if (shareTestOptional.isPresent()) {
                                  testPaperStatus = 1;
                                  Long shareTestId = shareTestOptional.get().getId();
                                  if (userTestRepository.existsByShareTestId(shareTestId)) {
                                    testPaperStatus = 2;
                                  }
                                }
                              }

                              return UnitResponse.builder()
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
                                              .testPaperStatus(testPaperStatus)
                                              .build()
                                              : null)
                                      .build();
                            })
                            .collect(Collectors.toList()))
                    .build())
            .collect(Collectors.toList());

    return CourseResponse.builder()
            .courseId(course.getId())
            .courseName(course.getCourseName())
            .sections(sections)
            .build();
  }


  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void updateCourse(Long courseId, CourseRegisterRequest request) {
    Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("해당 과정이 존재하지 않습니다."));

    course.setCourseName(request.getCourseName());

    List<Section> existingSections = course.getSections();
    for (int i = 0; i < request.getSections().size(); i++) {
      SectionRegisterRequest sectionRegister = request.getSections().get(i);
      Section section;

      if (i < existingSections.size()) {
        section = existingSections.get(i);
        section.setContent(sectionRegister.getContent());
      } else {
        section = buildSection(course, sectionRegister);
        sectionRepository.save(section);
      }

      List<Unit> existingUnits = section.getUnits();
      for (int j = 0; j < sectionRegister.getUnits().size(); j++) {
        UnitRegisterRequest unitRegister = sectionRegister.getUnits().get(j);
        Unit unit;

        if (j < existingUnits.size()) {
          unit = existingUnits.get(j);
          unit.setContent(unitRegister.getContent());
        } else {
          unit = buildUnit(section, unitRegister);
          unitRepository.save(unit);
        }
      }

      if (existingUnits.size() > sectionRegister.getUnits().size()) {
        List<Unit> unitsToDelete = existingUnits.subList(sectionRegister.getUnits().size(), existingUnits.size());
        unitsToDelete.forEach(unit -> {
          unitRepository.delete(unit);
          unitRepository.flush();
        });
      }
    }

    if (existingSections.size() > request.getSections().size()) {
      List<Section> sectionsToDelete = existingSections.subList(request.getSections().size(), existingSections.size());
      sectionsToDelete.forEach(section -> {
        sectionRepository.delete(section);
        sectionRepository.flush();
      });
    }

    courseRepository.save(course);
  }


  /**
   * {@inheritDoc}
   */
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
                    course.getCourseName(),
                    course.getGroupCode().getCodeDetails().get(0).getCommonCodeName()
            ))
            .collect(Collectors.toList());
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<CourseNameListResponse> getFilteredCourses(String gradeLevel, String year, String semester, String subject, Authentication authentication) {
    List<Long> groupCodeIds = codeDetailRepository.findGroupCodeIdsByDetails(gradeLevel, year, semester, subject);
    List<Course> courses = courseRepository.findByGroupCodeIdIn(groupCodeIds);
    ((AuthUser) authentication.getPrincipal()).getClassroom();
    return courses.stream().map(course -> new CourseNameListResponse(
            course.getId(),
            course.getCourseName(),
            course.getGroupCode().getCodeDetails().get(0).getCommonCodeName()
    )).collect(Collectors.toList());
  }

  /**
   * {@inheritDoc}
   */
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
