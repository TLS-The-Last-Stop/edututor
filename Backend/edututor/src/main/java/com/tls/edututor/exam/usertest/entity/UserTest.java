package com.tls.edututor.exam.usertest.entity;

import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "USER_TEST")
public class UserTest extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "TEST_PAPER_ID", nullable = false)
  private TestPaper testPaper;

  @Column(name = "RESULT", nullable = false)
  private Long result;

  @Column(name = "EXAM_TAKEN")
  private Boolean examTaken;
}
