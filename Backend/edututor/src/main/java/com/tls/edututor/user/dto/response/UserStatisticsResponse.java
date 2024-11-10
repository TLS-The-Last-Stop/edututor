package com.tls.edututor.user.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserStatisticsResponse implements Serializable {
  private static final long serialVersionUID = 4590128637074373895L;

  private SignupStats signupStats;
  private RatioStats ratioStats;
  private DeletedStats deletedStats;


  @Getter
  @Setter
  @NoArgsConstructor
  public static class SignupStats implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<YearlySignup> yearlySignups;    // 연도별
    private List<MonthlySignup> monthlySignups;  // 월별
    private List<DailySignup> dailySignups;      // 일별
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class RatioStats implements Serializable {
    private static final long serialVersionUID = 1L;

    private long totalUsers;
    private long teacherCount;
    private long studentCount;
    private double teacherRatio;  // 백분율
    private double studentRatio;   // 백분율
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class YearlySignup implements Serializable {
    private static final long serialVersionUID = 1L;

    private int year;
    private long count;
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class MonthlySignup implements Serializable {
    private static final long serialVersionUID = -8636179683049613937L;

    private String yearMonth;  // "YYYY-MM" 형식
    private long count;
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class DailySignup implements Serializable {
    private static final long serialVersionUID = 1L;

    private String date;  // "YYYY-MM-DD" 형식
    private long count;
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class DeletedStats implements Serializable {
    private static final long serialVersionUID = 1L;

    private RoleDeletedStats teacher;  // 선생님 탈퇴 통계
    private RoleDeletedStats student;  // 학생 탈퇴 통계
  }

  @Getter
  @Setter
  @NoArgsConstructor
  public static class RoleDeletedStats implements Serializable {
    private static final long serialVersionUID = 1L;

    private String role;
    private long totalCount;    // 전체 가입자
    private long deletedCount;  // 탈퇴 회원
    private double deleteRate;  // 탈퇴율
  }
}
