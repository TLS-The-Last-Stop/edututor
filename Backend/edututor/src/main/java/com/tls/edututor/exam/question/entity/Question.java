package com.tls.edututor.exam.question.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "QUESTION")
public class Question extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "TEST_PAPER_ID", nullable = false)
  private TestPaper testPaper;

  @Column(name = "CONTENT", nullable = false)
  private String content;

  @Column(name = "PASSAGE")
  private String passage;

  @Column(name = "COMMENTARY", columnDefinition = "TEXT")
  private String commentary;
}

