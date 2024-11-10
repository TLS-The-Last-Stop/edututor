package com.tls.edututor.issue.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.question.entity.Question;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Entity
@Table(name = "ISSUE")
@SQLDelete(sql = "UPDATE ISSUE SET is_deleted = true WHERE id = ?")
@SQLRestriction("is_deleted = false")
public class Issue extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "QUESTION_ID", nullable = false, insertable = false, updatable = false)
  private Question question;

  @Column(name = "STATUS")
  private Long status;

  @Column(name = "CONTENT")
  private String content;

  @Column(name = "REASON")
  private String reason;
}
