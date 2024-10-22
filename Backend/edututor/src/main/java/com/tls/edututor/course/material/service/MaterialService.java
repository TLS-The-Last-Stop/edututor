package com.tls.edututor.course.material.service;

import com.tls.edututor.course.material.dto.request.MaterialRegisterRequest;
import com.tls.edututor.course.material.entity.Material;

public interface MaterialService {

  Material createMaterial(MaterialRegisterRequest request);

}
