package com.tls.edututor.issue.entity;

import com.tls.edututor.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Getter
@Setter
@Entity
@Table(name = "ISSUE")
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
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
