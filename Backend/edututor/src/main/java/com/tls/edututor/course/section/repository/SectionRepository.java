package com.tls.edututor.course.section.repository;

import com.tls.edututor.course.section.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SectionRepository extends JpaRepository<Section, Long> {
}
