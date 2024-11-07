package com.tls.edututor.course.unit.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.material.entity.Material;
import com.tls.edututor.course.section.entity.Section;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Getter
@Setter
@Entity
@Builder
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
@NoArgsConstructor
@AllArgsConstructor
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

  @OneToMany(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Material> materials;

  @OneToOne(mappedBy = "unit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private TestPaper testPaper;
}
