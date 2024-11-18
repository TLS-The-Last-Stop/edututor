package com.tls.edututor.course.course.entity;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Entity
@SQLDelete(sql = "UPDATE COURSE_CLASSROOM SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
@Table(name = "COURSE_CLASSROOM")
public class CourseClassroom extends BaseEntity {

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
