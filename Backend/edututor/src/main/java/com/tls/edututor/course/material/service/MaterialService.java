package com.tls.edututor.course.material.service;

import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import com.tls.edututor.course.material.dto.response.MaterialResponse;
import com.tls.edututor.course.material.entity.Material;

public interface MaterialService {

  /**
   * 새로운 자료를 생성합니다.
   *
   * @param request 자료 등록 요청, 자료에 대한 데이터를 포함
   * @return 생성된 자료 엔티티
   */
  Material createMaterial(MaterialRegisterRequest request);

  /**
   * 기존의 자료를 수정합니다.
   *
   * @param materialId 수정할 자료의 ID
   * @param request 수정할 자료의 데이터를 포함하는 요청
   */
  void updateMaterial(Long materialId, MaterialRegisterRequest request);

  /**
   * 특정 자료를 삭제합니다.
   *
   * @param materialId 삭제할 자료의 ID
   */
  void deleteMaterial(Long materialId);

  /**
   * 특정 ID에 해당하는 자료를 조회합니다.
   *
   * @param materialId 조회할 자료의 ID
   * @return 조회된 자료의 응답 데이터
   */
  MaterialResponse getMaterialById(Long materialId);
}
