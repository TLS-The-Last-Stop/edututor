package com.tls.edututor.exam.testpaper.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.unit.entity.Unit;
import jakarta.persistence.*;

@Entity
@Table(name = "TEST_PAPER")
public class TestPaper extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "UNIT_ID", nullable = false)
  private Unit unit;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @Column(name = "CONTENT")
  private String content;
}
