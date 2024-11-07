package com.tls.edututor.user.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserResponse {

  private List<UserTEResponse> teachers;
  private List<UserSUResponse> students;

  public UserResponse() {
    teachers = new ArrayList<>();
    students = new ArrayList<>();
  }

}
