package com.tls.edututor.course.material.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.unit.entity.Unit;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MATERIAL")
public class Material extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "UNIT_ID", nullable = false)
  private Unit unit;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @Column(name = "CONTENT", nullable = false)
  private String content;

  @Column(name = "URL")
  private String url;
}
