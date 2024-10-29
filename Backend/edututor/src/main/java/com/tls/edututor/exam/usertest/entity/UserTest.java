package com.tls.edututor.exam.usertest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.sharetest.entity.ShareTest;
import com.tls.edututor.exam.useransewer.entity.UserAnswer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "USER_TEST")
public class UserTest extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "SHARE_TEST_ID", nullable = false)
  @JsonBackReference
  private ShareTest shareTest;

  @Column(name = "RESULT")
  private Double result;

  @Column(name = "EXAM_TAKEN")
  private Boolean examTaken;

  @OneToMany(mappedBy = "userTest", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<UserAnswer> userAnswers;
}