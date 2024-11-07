package com.tls.edututor.exam.useransewer.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.usertest.entity.UserTest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "USER_ANSWER")
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
public class UserAnswer extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "USER_TEST_ID", nullable = false)
  private UserTest userTest;

  @ManyToOne
  @JoinColumn(name = "QUESTION_ID", nullable = false)
  private Question question;

  @Column(name = "ANSWER")
  private String answer;

  @Column(name = "SUBMITTED_AT", nullable = false)
  private LocalDateTime submittedAt;

  @Column(name = "IS_CORRECT")
  private Boolean isCorrect;
}
