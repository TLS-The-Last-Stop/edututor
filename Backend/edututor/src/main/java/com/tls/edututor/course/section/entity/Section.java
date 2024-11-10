package com.tls.edututor.course.section.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.course.entity.Course;
import com.tls.edututor.course.unit.entity.Unit;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Getter
@Setter
@Entity
@Builder
@SQLDelete(sql = "UPDATE SECTION SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SECTION")
public class Section extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "COURSE_ID", nullable = false)
  private Course course;

  @Column(name = "CONTENT")
  private String content;

  @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Unit> units;
}
