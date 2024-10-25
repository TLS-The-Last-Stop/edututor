package com.tls.edututor.code.codedetail.service;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.codegroup.repository.CodeGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CodeService implements CodeServiceImpl {

  private final CodeGroupRepository codeGroupRepository;
  private final CodeDetailRepository codeDetailRepository;

  /**
   * 특정 코드그릅의 모든 코드 조회
   *
   * @param groupId(ex 1001,... 1005)
   * @return List<CodeDetail>
   */
  @Override
  public List<CodeDetail> getCodesByGroup(String groupId) {
    return codeDetailRepository.findByCodeGroupId(groupId);
  }

  /**
   * 특정 코드그룹의 특정 코드 조회
   *
   * @param groupId(ex 1001,... 1005)
   * @return CodeDetail
   */
  @Override
  public CodeDetail getCode(String groupId, String codeId) {
    return codeDetailRepository.findByCodeGroupIdAndId(groupId, codeId)
            .orElseThrow(() -> new RuntimeException("Code not found: group[" + groupId + "] and codeId[" + codeId + "]"));
  }

  /**
   * 여러 코드그룹의 코드들을 한 번에 조회
   *
   * @param groupIds
   * @return
   */
  @Override
  public Map<String, List<CodeDetail>> getCodesByGroups(String... groupIds) {
    List<String> groupIdList = Arrays.asList(groupIds);
    List<CodeDetail> allCodes = codeDetailRepository.findByCodeGroupIdIn(groupIdList);

    return allCodes.stream()
            .collect(Collectors.groupingBy(code -> code.getCodeGroup().getId()));
  }

  /**
   * 모든 그룹코드와 코드 조회
   *
   * @return
   */
  @Override
  public Map<CodeGroup, List<CodeDetail>> getAllCodes() {
    List<CodeGroup> groups = codeGroupRepository.findAll();

    return groups.stream()
            .collect(Collectors.toMap(
                    group -> group,
                    group -> codeDetailRepository.findByCodeGroupId(group.getId())
            ));
  }

}
