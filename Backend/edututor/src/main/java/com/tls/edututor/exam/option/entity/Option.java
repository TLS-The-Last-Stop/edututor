package com.tls.edututor.exam.option.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.question.entity.Question;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "OPTION")
public class Option extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "QUESTION_ID", nullable = false)
  private Question question;

  @Column(name = "CONTENT")
  private String content;

  @Column(name = "IS_CORRECT")
  private Boolean isCorrect;
}
