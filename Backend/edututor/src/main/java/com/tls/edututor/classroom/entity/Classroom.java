package com.tls.edututor.classroom.entity;

import com.tls.edututor.classroom.dto.request.ClassroomRequest;
import com.tls.edututor.common.entity.BaseEntity;
import com.tls.edututor.school.entity.School;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "CLASSROOM")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Classroom extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "SCHOOL_ID", nullable = false)
  private School school;

  @Column(name = "CLASSROOM_NAME", nullable = false)
  private String classroomName;

  @Column(name = "YEAR", nullable = false)
  private int year;

  @Column(name = "GRADE", nullable = false)
  private String grade;

  @Builder(builderMethodName = "withDto")
  public Classroom(ClassroomRequest request, School school, String type) {
    this.school = school;
    classroomName = request.getClassroomName();
    year = request.getYear();
    grade = request.getGrade();
    if (type.startsWith("EL")) {
      grade = switch (grade) {
        case "1" -> "E1";
        case "2" -> "E2";
        case "3" -> "E3";
        case "4" -> "E4";
        case "5" -> "E5";
        case "6" -> "E6";
        default -> throw new IllegalStateException("Invalid elementary school grade: " + request.getGrade());
      };
    } else if (type.startsWith("MI")) {
      grade = switch (grade) {
        case "1" -> "M1";
        case "2" -> "M2";
        case "3" -> "M3";
        default -> throw new IllegalStateException("Invalid middle school grade: " + request.getGrade());
      };
    } else if (type.startsWith("HI")) {
      grade = switch (grade) {
        case "1" -> "H1";
        case "2" -> "H2";
        case "3" -> "H3";
        default -> throw new IllegalStateException("Invalid high school grade: " + request.getGrade());
      };
    } else {
      throw new IllegalStateException("Invalid school type: " + type);
    }
  }

}
