package com.tls.edututor.course.material.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MaterialRegisterRequest {

  private Long unitId;

  private String title;

  private String content;

  private String url;

  private Long writerId;

}