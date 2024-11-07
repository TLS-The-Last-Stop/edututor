package com.tls.edututor.issue.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "ISSUE")
public class Issue extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "QUESTION_ID", nullable = false)
  private Long questionId;

  @Column(name = "STATUS")
  private Long status;

  @Column(name = "CONTENT")
  private String content;

}
