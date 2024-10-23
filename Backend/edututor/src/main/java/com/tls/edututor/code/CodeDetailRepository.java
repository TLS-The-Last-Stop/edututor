package com.tls.edututor.code;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CodeDetailRepository extends JpaRepository<CodeDetail, Long> {

  @Query("SELECT cd FROM CodeDetail cd WHERE cd.codeGroup.id = 1001 AND cd.id = :codeId")
  Optional<CodeDetail> findSubjectById(String codeId);

  @Query("SELECT cd FROM CodeDetail cd WHERE cd.codeGroup.id = 1002 AND cd.id = :codeId")
  Optional<CodeDetail> findSemesterById(String codeId);

  @Query("SELECT cd FROM CodeDetail cd WHERE cd.codeGroup.id = 1003 AND cd.id = :codeId")
  Optional<CodeDetail> findGradeById(String codeId);

  @Query("SELECT cd FROM CodeDetail cd WHERE cd.codeGroup.id = 1004 AND cd.id = :codeId")
  Optional<CodeDetail> findSchoolLevelsById(String codeId);

  @Query("SELECT cd FROM CodeDetail cd WHERE cd.codeGroup.id = 1005 AND cd.id = :codeId")
  Optional<CodeDetail> findRoleById(String codeId);
}
