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

  /**
   * 학습자료를 생성하는 API입니다.
   *
   * @param request 학습자료 등록 요청 정보
   * @return 학습자료 생성 성공 응답
   */
  @PostMapping
  public CommonApiResponse<Void> createMaterial(@RequestBody MaterialRegisterRequest request) {
    materialService.createMaterial(request);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 생성 성공");
  }

  /**
   * 학습자료를 수정하는 API입니다.
   *
   * @param materialId 수정할 학습자료의 ID
   * @param request 수정할 학습자료의 내용
   * @return 학습자료 수정 성공 응답
   */
  @PutMapping("/{materialId}")
  public CommonApiResponse<Void> updateMaterial(
          @PathVariable Long materialId,
          @RequestBody MaterialRegisterRequest request
  ) {
    materialService.updateMaterial(materialId, request);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 수정 성공");
  }

  /**
   * 학습자료를 삭제하는 API입니다.
   *
   * @param materialId 삭제할 학습자료의 ID
   * @return 학습자료 삭제 성공 응답
   */
  @DeleteMapping("/{materialId}")
  public CommonApiResponse<Void> deleteMaterial(@PathVariable Long materialId) {
    materialService.deleteMaterial(materialId);
    return CommonApiResponse.createSuccessWithNoContent("학습자료 삭제 성공");
  }

  /**
   * 학습자료의 상세 정보를 조회하는 API입니다.
   *
   * @param materialId 조회할 학습자료의 ID
   * @return 조회된 학습자료의 상세 정보
   */
  @GetMapping("/{materialId}")
  public CommonApiResponse<MaterialResponse> getMaterialById(@PathVariable Long materialId) {
    MaterialResponse response = materialService.getMaterialById(materialId);
    return CommonApiResponse.createSuccess("학습자료 조회 성공", response);
  }
}
