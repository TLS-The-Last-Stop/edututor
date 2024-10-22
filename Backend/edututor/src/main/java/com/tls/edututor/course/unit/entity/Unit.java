package com.tls.edututor.course.unit.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.section.entity.Section;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "UNIT")
public class Unit extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "SECTION_ID", nullable = false)
  private Section section;

  @Column(name = "CONTENT")
  private String content;
}
