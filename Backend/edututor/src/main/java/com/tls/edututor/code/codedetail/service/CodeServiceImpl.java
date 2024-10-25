package com.tls.edututor.code.codedetail.service;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codegroup.entity.CodeGroup;

import java.util.List;
import java.util.Map;

public interface CodeServiceImpl {

  // 특정 코드그룹의 모든 코드 조회
  List<CodeDetail> getCodesByGroup(String groupId);

  // 특정 코드그룹의 특정 코드 조회
  CodeDetail getCode(String groupId, String codeId);

  // 여러 코드그룹의 코드들을 한번에 조회
  Map<String, List<CodeDetail>> getCodesByGroups(String... groupIds);

  // 모든 코드그룹과 코드 조회
  Map<CodeGroup, List<CodeDetail>> getAllCodes();
}
