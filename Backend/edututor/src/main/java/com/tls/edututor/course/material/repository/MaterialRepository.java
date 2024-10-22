package com.tls.edututor.course.material.repository;

import com.tls.edututor.course.material.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}
