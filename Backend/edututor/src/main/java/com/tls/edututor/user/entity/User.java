package com.tls.edututor.user.entity;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDate;

@Entity
@Table(name = "USER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "update user u set u.is_deleted = true where u.id = ?")
@SQLRestriction("is_deleted = false")
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

  @Column(name = "USERNAME", nullable = false)
  private String username;

  @Column(name = "EMAIL")
  private String email;

  @Column(name = "PHONE_NUM")
  private String phoneNum;

  @Column(name = "BIRTH")
  private LocalDate birthDay;

  @Column(name = "role", nullable = false)
  private String role;

  @Column(name = "REGISTRATION_STATUS")
  @Enumerated(EnumType.STRING)
  private RegistrationStatus registrationStatus = RegistrationStatus.COMPLETE; // 기본값 설정

  @OneToOne(mappedBy = "user")
  private OAuthUser oAuthUser;

  public static User createOAuthUser(String email, String username, String provider, String providerId) {
    User user = new User();
    user.email = email;
    user.username = username;
    user.registrationStatus = RegistrationStatus.OAUTH_REGISTERED;
    user.loginId = providerId;
    user.role = "ROLE_PENDING";

    // Oauth 사용자 정보 생성 및 연결
    OAuthUser oAuthUser = OAuthUser.createOAuthUser(provider, providerId, user);
    user.setOAuthUser(oAuthUser);
    return user;
  }

  public boolean isOAuthUser() {
    return this.oAuthUser != null;
  }

  public void completeOAuthRegistration(Classroom classroom, String phoneNum, LocalDate birthDay, String role) {
    if (!isOAuthUser()) throw new IllegalStateException("OAuth 사용자만 이 메서드를 호출할 수 있습니다.");

    this.classroom = classroom;
    this.phoneNum = phoneNum;
    this.birthDay = birthDay;
    this.role = role;
    this.registrationStatus = RegistrationStatus.COMPLETE;
  }

  public static User createTeacher(UserTERequest dto) {
    User user = new User();
    user.loginId = dto.getLoginId();
    user.password = dto.getPassword();
    user.username = dto.getUsername();
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
    user.username = dto.getUsername();
    user.role = dto.getType();
    return user;
  }

  public User updateTeacher(UserTERequest dto) {
    if (dto.getUsername() != null) this.username = dto.getUsername();
    if (dto.getPassword() != null) this.password = dto.getPassword();
    if (dto.getPhoneNum() != null) this.phoneNum = dto.getPhoneNum();

    return this;
  }

  public User updateStudent(UserSURequest dto) {
    this.username = dto.getUsername();
    if (dto.getPassword() != null) this.password = dto.getPassword();

    return this;
  }

  public void setClassroom(Classroom classroom) {
    this.classroom = classroom;
  }

  public void setOAuthUser(OAuthUser oAuthUser) {
    this.oAuthUser = oAuthUser;
  }

  public void updateUserPassword(String password) {
    this.password = password;
  }
}
