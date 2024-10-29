package com.tls.edututor.exam.sharetest.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.exam.testpaper.entity.TestPaper;
import com.tls.edututor.exam.usertest.entity.UserTest;
import com.tls.edututor.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "SHARE_TEST")
public class ShareTest extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "TEST_PAPER_ID", nullable = false)
  @JsonBackReference
  private TestPaper testPaper;

  @OneToMany(mappedBy = "shareTest", cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<UserTest> userTests;
}