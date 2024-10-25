package com.tls.edututor.course.course.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.section.entity.Section;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "COURSE")
public class Course extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "COURSE_NAME")
	private String courseName;

	@Column
	private String codeGroupId;

  @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
  private Set<CourseClassroom> courseClassrooms;

  @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Section> sections;
}
