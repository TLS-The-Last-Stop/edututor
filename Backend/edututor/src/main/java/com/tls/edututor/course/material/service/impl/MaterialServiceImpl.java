package com.tls.edututor.course.material.service.impl;

import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import com.tls.edututor.course.material.service.MaterialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tls.edututor.course.material.entity.Material;
import com.tls.edututor.course.unit.entity.Unit;
import com.tls.edututor.course.unit.repository.UnitRepository;
import com.tls.edututor.course.material.repository.MaterialRepository;

@RequiredArgsConstructor
@Service
public class MaterialServiceImpl implements MaterialService {

  private final MaterialRepository materialRepository;
  private final UnitRepository unitRepository;

  @Override
  @Transactional
  public Material createMaterial(MaterialRegisterRequest request) {
    Unit unit = unitRepository.findById(request.getUnitId())
            .orElseThrow(() -> new IllegalArgumentException("차수가 존재하지 않습니다.: " + request.getUnitId()));

    Material material = buildMaterial(unit, request);

    return materialRepository.save(material);
  }

  private Material buildMaterial(Unit unit, MaterialRegisterRequest request) {
    return Material.builder()
            .unit(unit)
            .title(request.getTitle())
            .content(request.getContent())
            .build();
  }
}
