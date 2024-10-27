package com.tls.edututor.course.material.service;

import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import com.tls.edututor.course.material.dto.response.MaterialResponse;
import com.tls.edututor.course.material.entity.Material;

public interface MaterialService {

  Material createMaterial(MaterialRegisterRequest request);

  void updateMaterial(Long materialId, MaterialRegisterRequest request);

  void deleteMaterial(Long materialId);

  MaterialResponse getMaterialById(Long materialId);
}
