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
  private long totalUsers;
  private long totalTeachers;
  private long totalStudents;
  private List<MonthlySignup> monthlySignups;
  private List<TeacherStudentCount> teacherStudentCounts;

  @Getter
  @Setter
  @NoArgsConstructor
  public static class MonthlySignup implements Serializable {
    private String yearMonth;  // "2024-03" 형식
    private long count;
  }
}
