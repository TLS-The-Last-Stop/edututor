package com.tls.edututor.image.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.course.entity.Course;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "IMAGE")
public class Image extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "IMAGE_URL", nullable = false)
  private String imageUrl;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "COURSE_ID", nullable = false)
  private Course course;
}
