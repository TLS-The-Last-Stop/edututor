package com.tls.edututor.course.material.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import com.tls.edututor.course.material.dto.response.MaterialResponse;
import com.tls.edututor.course.material.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/material")
public class MaterialController {

  private final MaterialService materialService;

  @PostMapping
  public CommonApiResponse<Void> createMaterial(@RequestBody MaterialRegisterRequest request) {
    materialService.createMaterial(request);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 생성 성공");
  }

  @PutMapping("/{materialId}")
  public CommonApiResponse<Void> updateMaterial(
          @PathVariable Long materialId,
          @RequestBody MaterialRegisterRequest request
  ) {
    materialService.updateMaterial(materialId, request);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 수정 성공");
  }

  @DeleteMapping("/{materialId}")
  public CommonApiResponse<Void> deleteMaterial(@PathVariable Long materialId) {
    materialService.deleteMaterial(materialId);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 삭제 성공");
  }

  @GetMapping("/{materialId}")
  public CommonApiResponse<MaterialResponse> getMaterialById(@PathVariable Long materialId) {
    MaterialResponse response = materialService.getMaterialById(materialId);
    return CommonApiResponse.createSuccess("학습자료 조회 성공", response);
  }
}
