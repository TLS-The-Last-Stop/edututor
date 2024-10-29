package com.tls.edututor.user.entity;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.user.dto.request.UserSURequest;
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

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "CLASSROOM_ID")
  private Classroom classroom;

  @Column(name = "LOGIN_ID", unique = true, nullable = false)
  private String loginId;

  @Column(name = "PASSWORD")
  private String password;

  @Column(name = "FULL_NAME", nullable = false)
  private String fullName;

  @Column(name = "EMAIL")
  private String email;

  @Column(name = "PHONE_NUM")
  private String phoneNum;

  @Column(name = "BIRTH")
  private LocalDate birthDay;

  @Column(name = "role", nullable = false)
  private String role;

  public static User createTeacher(UserTERequest dto) {
    User user = new User();
    user.loginId = dto.getLoginId();
    user.password = dto.getPassword();
    user.fullName = dto.getFullName();
    user.email = dto.getEmail();
    user.phoneNum = dto.getPhoneNum();
    user.birthDay = dto.getBirthDay();
    user.role = dto.getType();
    return user;
  }

  public static User createStudent(UserSURequest dto) {
    User user = new User();
    user.loginId = dto.getLoginId();
    user.password = dto.getPassword();
    user.fullName = dto.getFullName();
    user.role = dto.getType();
    return user;
  }

  public void setClassroom(Classroom classroom) {
    this.classroom = classroom;
  }
}
