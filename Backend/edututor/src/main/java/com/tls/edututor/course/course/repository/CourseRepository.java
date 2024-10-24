package com.tls.edututor.course.course.repository;

import com.tls.edututor.course.course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
	@Query("SELECT cd.codeDetailValue, cd.id FROM Course c " +
					"JOIN CodeDetail cd ON cd.codeGroup.id = c.codeGroupId " +
					"WHERE cd.id = :codeId")
	List<Object[]> findCourseDetailsByCodeId(@Param("codeId") String codeId);
}
