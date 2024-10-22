package com.tls.edututor.course.unit.repository;

import com.tls.edututor.course.unit.entity.Unit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit, Long> {
}