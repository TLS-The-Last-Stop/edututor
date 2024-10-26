package com.tls.edututor.code.codedetail.repository;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CodeDetailRepository extends JpaRepository<CodeDetail, Long> {

  @Query("SELECT cd FROM CodeDetail cd WHERE cd.codeGroup.id = :codeGroupId AND cd.id = :codeId")
  Optional<CodeDetail> findById(String codeId);

  List<CodeDetail> findByCodeGroupId(String groupId);

  Optional<CodeDetail> findByCodeGroupIdAndId(String groupId, String codeId);

  List<CodeDetail> findByCodeGroupIdIn(List<String> groupIdList);
}
