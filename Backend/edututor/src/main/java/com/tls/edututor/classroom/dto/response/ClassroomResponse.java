package com.tls.edututor.classroom.dto.response;

import com.tls.edututor.classroom.entity.Classroom;
import com.tls.edututor.school.dto.response.SchoolResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ClassroomResponse {
  private Long id;
  private String classroomName;
  private String grade;
  private int year;
  private SchoolResponse school;

  public static ClassroomResponse from(Classroom classroom) {
    return new ClassroomResponse(
            classroom.getId(),
            classroom.getClassroomName(),
            classroom.getGrade(),
            classroom.getYear(),
            SchoolResponse.from(classroom.getSchool())
    );
  }
}
