package com.tls.edututor.course.course.entity;

import com.tls.edututor.classroom.entity.Classroom;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "COURSE_CLASSROOM")
public class CourseClassroom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "COURSE_ID", nullable = false)
  private Course course;

  @ManyToOne
  @JoinColumn(name = "CLASSROOM_ID", nullable = false)
  private Classroom classroom;

}
