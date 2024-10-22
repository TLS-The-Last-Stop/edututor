package com.tls.edututor.classroom.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "CLASSROOM")
public class Classroom extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "CLASSROOM_NAME", nullable = false)
  private String ClassroomName;

  @Column(name = "YEAR", nullable = false)
  private int year;
}
