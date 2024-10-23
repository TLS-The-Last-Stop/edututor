package com.tls.edututor.exam.option.repository;

import com.tls.edututor.exam.option.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<Option, Long> {
}
