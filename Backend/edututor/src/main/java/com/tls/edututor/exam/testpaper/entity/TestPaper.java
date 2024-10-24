package com.tls.edututor.exam.testpaper.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.exam.question.entity.Question;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "TEST_PAPER")
public class TestPaper extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "UNIT_ID", nullable = false)
  private Unit unit;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @OneToMany(mappedBy = "testPaper", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Question> questions;

}
