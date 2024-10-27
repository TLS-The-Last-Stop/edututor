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

  @Override
  @Transactional
  public Material createMaterial(MaterialRegisterRequest request) {
    Unit unit = findUnitById(request.getUnitId());
    Material material = buildMaterial(unit, request);
    return materialRepository.save(material);
  }

  @Override
  @Transactional
  public void updateMaterial(Long materialId, MaterialRegisterRequest request) {
    Material material = findMaterialById(materialId);
    updateMaterialFields(material, request);
    materialRepository.save(material);
  }

  @Override
  @Transactional
  public void deleteMaterial(Long materialId) {
    Material material = findMaterialById(materialId);
    materialRepository.delete(material);
  }

  @Override
  @Transactional(readOnly = true)
  public MaterialResponse getMaterialById(Long materialId) {
    Material material = findMaterialById(materialId);
    return mapToMaterialResponse(material);
  }

  private Unit findUnitById(Long unitId) {
    return unitRepository.findById(unitId)
            .orElseThrow(() -> new IllegalArgumentException("차수가 존재하지 않습니다.: " + unitId));
  }

  private Material findMaterialById(Long materialId) {
    return materialRepository.findById(materialId)
            .orElseThrow(() -> new IllegalArgumentException("해당 학습자료가 존재하지 않습니다. ID: " + materialId));
  }

  private void updateMaterialFields(Material material, MaterialRegisterRequest request) {
    material.setTitle(request.getTitle());
    material.setContent(request.getContent());
  }

  private Material buildMaterial(Unit unit, MaterialRegisterRequest request) {
    return Material.builder()
            .unit(unit)
            .title(request.getTitle())
            .content(request.getContent())
            .build();
  }

  private MaterialResponse mapToMaterialResponse(Material material) {
    return MaterialResponse.builder()
            .materialId(material.getId())
            .title(material.getTitle())
            .content(material.getContent())
            .build();
  }
}
