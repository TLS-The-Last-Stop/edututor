package com.tls.edututor.course.material.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.unit.entity.Unit;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Entity
@Builder
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
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
