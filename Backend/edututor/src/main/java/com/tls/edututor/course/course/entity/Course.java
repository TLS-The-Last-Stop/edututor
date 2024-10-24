package com.tls.edututor.course.course.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "COURSE")
public class Course extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "COURSE_NAME")
	private String courseName;

	@Column
	private int codeGroupId;

	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	private Set<CourseClassroom> courseClassrooms;
}