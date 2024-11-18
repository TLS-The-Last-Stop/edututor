package com.tls.edututor.course.material.service.impl;

import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import com.tls.edututor.course.material.dto.response.MaterialResponse;
import com.tls.edututor.course.material.entity.Material;
import com.tls.edututor.course.material.repository.MaterialRepository;
import com.tls.edututor.course.material.service.MaterialService;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class MaterialServiceImpl implements MaterialService {

  private final MaterialRepository materialRepository;
  private final UnitRepository unitRepository;

  /**
   * 새로운 학습자료를 생성합니다.
   *
   * @param request 학습자료 등록 요청
   * @return 생성된 학습자료
   */
  @Override
  @Transactional
  public Material createMaterial(MaterialRegisterRequest request) {
    Unit unit = findUnitById(request.getUnitId());
    Material material = buildMaterial(unit, request);
    return materialRepository.save(material);
  }

  /**
   * 기존 학습자료를 수정합니다.
   *
   * @param materialId 수정할 학습자료의 ID
   * @param request 수정할 학습자료의 내용
   */
  @Override
  @Transactional
  public void updateMaterial(Long materialId, MaterialRegisterRequest request) {
    Material material = findMaterialById(materialId);
    updateMaterialFields(material, request);
    materialRepository.save(material);
  }

  /**
   * 학습자료를 삭제합니다.
   *
   * @param materialId 삭제할 학습자료의 ID
   */
  @Override
  @Transactional
  public void deleteMaterial(Long materialId) {
    Material material = findMaterialById(materialId);
    materialRepository.delete(material);
  }

  /**
   * 학습자료의 상세 정보를 조회합니다.
   *
   * @param materialId 조회할 학습자료의 ID
   * @return 학습자료의 상세 응답 정보
   */
  @Override
  @Transactional(readOnly = true)
  public MaterialResponse getMaterialById(Long materialId) {
    Material material = findMaterialById(materialId);
    return mapToMaterialResponse(material);
  }

  /**
   * ID에 해당하는 차수를 조회합니다.
   *
   * @param unitId 조회할 차수의 ID
   * @return 조회된 차수
   * @throws IllegalArgumentException 차수가 존재하지 않으면 예외 발생
   */
  private Unit findUnitById(Long unitId) {
    return unitRepository.findById(unitId)
            .orElseThrow(() -> new IllegalArgumentException("차수가 존재하지 않습니다.: " + unitId));
  }

  /**
   * ID에 해당하는 학습자료를 조회합니다.
   *
   * @param materialId 조회할 학습자료의 ID
   * @return 조회된 학습자료
   * @throws IllegalArgumentException 학습자료가 존재하지 않으면 예외 발생
   */
  private Material findMaterialById(Long materialId) {
    return materialRepository.findById(materialId)
            .orElseThrow(() -> new IllegalArgumentException("해당 학습자료가 존재하지 않습니다. ID: " + materialId));
  }

  /**
   * 학습자료의 필드를 수정합니다.
   *
   * @param material 수정할 학습자료
   * @param request 수정할 내용
   */
  private void updateMaterialFields(Material material, MaterialRegisterRequest request) {
    material.setTitle(request.getTitle());
    material.setContent(request.getContent());
    material.setUrl(request.getUrl());
  }

  /**
   * 주어진 요청 데이터를 바탕으로 새로운 학습자료를 생성합니다.
   *
   * @param unit 학습자료가 속할 차수
   * @param request 학습자료 등록 요청 데이터
   * @return 생성된 학습자료
   */
  private Material buildMaterial(Unit unit, MaterialRegisterRequest request) {
    return Material.builder()
            .unit(unit)
            .title(request.getTitle())
            .content(request.getContent())
            .url(request.getUrl())
            .build();
  }

  /**
   * 학습자료 엔티티를 학습자료 응답 DTO로 변환합니다.
   *
   * @param material 변환할 학습자료 엔티티
   * @return 변환된 학습자료 응답 DTO
   */
  private MaterialResponse mapToMaterialResponse(Material material) {
    return MaterialResponse.builder()
            .materialId(material.getId())
            .title(material.getTitle())
            .content(material.getContent())
            .url(material.getUrl())
            .build();
  }
}
