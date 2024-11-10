package com.tls.edututor.exam.testpaper.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TEST_PAPER")
@SQLDelete(sql = "UPDATE TEST_PAPER SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class TestPaper extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "UNIT_ID")
  private Unit unit;

  @Column(name = "TITLE", nullable = false)
  private String title;

  @OneToMany(mappedBy = "testPaper", cascade = CascadeType.ALL, orphanRemoval = true)
  @JsonManagedReference
  private List<Question> questions;

  @OneToMany(mappedBy = "testPaper", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<ShareTest> shareTests;
}
