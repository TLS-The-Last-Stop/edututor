package com.tls.edututor.code.codedetail.repository;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodeDetailRepository extends JpaRepository<CodeDetail, Long> {

  @Query("SELECT cd.codeGroup.id FROM CodeDetail cd WHERE cd.commonCodeName IN (:names) GROUP BY cd.codeGroup.id HAVING COUNT(cd.codeGroup.id) = :count")
  Optional<Long> findCodeGroupIdByCommonCodeNames(@Param("names") List<String> names, @Param("count") long count);

  @Query("SELECT DISTINCT cd1.codeGroup.id " +
          "FROM CodeDetail cd1 " +
          "LEFT JOIN CodeDetail cd2 ON cd2.codeGroup = cd1.codeGroup AND cd2.codeDetailId = 1003 " +
          "LEFT JOIN CodeDetail cd3 ON cd3.codeGroup = cd1.codeGroup AND cd3.codeDetailId = 1002 " +
          "LEFT JOIN CodeDetail cd4 ON cd4.codeGroup = cd1.codeGroup AND cd4.codeDetailId = 1001 " +
          "WHERE (:gradeLevel IS NULL OR (cd1.commonCodeName = :gradeLevel AND cd1.codeDetailId = 1004)) " +
          "AND (:year IS NULL OR (cd2.commonCodeName = :year)) " +
          "AND (:semester IS NULL OR (cd3.commonCodeName = :semester)) " +
          "AND (:subject IS NULL OR (cd4.commonCodeName = :subject))")
  List<Long> findGroupCodeIdsByDetails(
          @Param("gradeLevel") String gradeLevel,
          @Param("year") String year,
          @Param("semester") String semester,
          @Param("subject") String subject);
}