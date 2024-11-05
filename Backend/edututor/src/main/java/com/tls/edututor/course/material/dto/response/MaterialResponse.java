package com.tls.edututor.course.material.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MaterialResponse {
  private Long materialId;
  private String title;
  private String content;
  private String url;

}