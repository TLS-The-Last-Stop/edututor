package com.tls.edututor.code;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CodeDataInitializer implements CommandLineRunner {
  private final EntityManager em;

  @Override
  @Transactional
  public void run(String... args) throws Exception {

    Long count = em.createQuery("select count(c) from CodeGroup  c", Long.class)
            .getSingleResult();
    if (count > 0) {
      System.out.println("이미 존재합니다.");
      return;
    }

    // 공통 코드 그룹 생성
    List<CodeGroup> codeGroups = Arrays.asList(
            createCodeGroup("1001", "과목"),
            createCodeGroup("1002", "학기"),
            createCodeGroup("1003", "학년"),
            createCodeGroup("1004", "급수"),
            createCodeGroup("1005", "역할")
    );

    // 그룹 저장
    codeGroups.forEach(em::persist);
    em.flush();

    // 과목 코드
    createAndPersistCodeDetail("KO", codeGroups.get(0), "국어");
    createAndPersistCodeDetail("ME", codeGroups.get(0), "수학");
    createAndPersistCodeDetail("EN", codeGroups.get(0), "영어");
    createAndPersistCodeDetail("SO", codeGroups.get(0), "사회");
    createAndPersistCodeDetail("SI", codeGroups.get(0), "과학");

    // 학기 코드
    createAndPersistCodeDetail("FS", codeGroups.get(1), "1학기");
    createAndPersistCodeDetail("SS", codeGroups.get(1), "2학기");

    // 학년 코드
    createAndPersistCodeDetail("E1", codeGroups.get(2), "초1");
    createAndPersistCodeDetail("E2", codeGroups.get(2), "초2");
    createAndPersistCodeDetail("E3", codeGroups.get(2), "초3");
    createAndPersistCodeDetail("E4", codeGroups.get(2), "초4");
    createAndPersistCodeDetail("E5", codeGroups.get(2), "초5");
    createAndPersistCodeDetail("E6", codeGroups.get(2), "초6");
    createAndPersistCodeDetail("M1", codeGroups.get(2), "중1");
    createAndPersistCodeDetail("M2", codeGroups.get(2), "중2");
    createAndPersistCodeDetail("M3", codeGroups.get(2), "중3");
    createAndPersistCodeDetail("H1", codeGroups.get(2), "고1");
    createAndPersistCodeDetail("H2", codeGroups.get(2), "고2");
    createAndPersistCodeDetail("H3", codeGroups.get(2), "고3");

    // 급수 코드
    createAndPersistCodeDetail("EL", codeGroups.get(3), "초등학교");
    createAndPersistCodeDetail("MI", codeGroups.get(3), "중학교");
    createAndPersistCodeDetail("HI", codeGroups.get(3), "고등학교");

    // 역할 코드
    createAndPersistCodeDetail("TE", codeGroups.get(4), "선생님");
    createAndPersistCodeDetail("SU", codeGroups.get(4), "학생");
    createAndPersistCodeDetail("AD", codeGroups.get(4), "관리자");
  }

  private CodeGroup createCodeGroup(String id, String name) {
    CodeGroup codeGroup = CodeGroup.withName()
            .id(id)
            .codeGroupName(name)
            .build();
    return codeGroup;
  }

  private void createAndPersistCodeDetail(String code, CodeGroup group, String value) {
    CodeDetail codeDetail = CodeDetail.withCode()
            .id(code)
            .codeGroup(group)
            .codeDetailValue(value)
            .build();
    em.persist(codeDetail);
  }
}
