package com.tls.edututor.code.codegroup.repository;

import com.tls.edututor.code.codegroup.entity.CodeGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CodeGroupRepository extends JpaRepository<CodeGroup, Long> {

  Optional<CodeGroup> findByCodeGroupName(String codeGroupName);
}
