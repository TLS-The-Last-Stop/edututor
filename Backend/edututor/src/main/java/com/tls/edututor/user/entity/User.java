package com.tls.edututor.user.entity;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.user.dto.request.UserTERequest;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "USER")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "CLASS_ID")
  private Classroom classroom;

  @Column(name = "LOGIN_ID", unique = true, nullable = false)
  private String loginId;

  @Column(name = "PASSWORD", nullable = false)
  private String password;

  @Column(name = "FULL_NAME", nullable = false)
  private String fullName;

  @Column(name = "EMAIL", nullable = false)
  private String email;

  @Column(name = "PHONE_NUM", nullable = false)
  private String phoneNum;

  @Column(name = "BIRTH", nullable = false)
  private LocalDate birthDay;

  @Builder(builderMethodName = "withDto")
  public User(UserTERequest dto, Classroom classroom) {
    this.classroom = classroom;
    loginId = dto.getLoginId();
    password = dto.getPassword();
    fullName = dto.getFullName();
    email = dto.getEmail();
    phoneNum = dto.getPhoneNum();
    birthDay = dto.getBirthDay();
  }

}
