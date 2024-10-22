package com.tls.edututor.course.material.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.tls.edututor.course.material.service.MaterialService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/material")
public class MaterialController {

  private final MaterialService materialService;

  @PostMapping
  public CommonApiResponse<Void> createMaterial(@RequestBody MaterialRegisterRequest request) {
    materialService.createMaterial(request);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 생성 성공");
  }
}
