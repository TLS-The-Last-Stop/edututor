//package com.tls.edututor.common.initilizer;
//
//import com.tls.edututor.code.codedetail.entity.CodeDetail;
//import com.tls.edututor.code.codegroup.entity.CodeGroup;
//import com.tls.edututor.exam.option.entity.Option;
//import com.tls.edututor.exam.question.entity.Question;
//import com.tls.edututor.exam.question.entity.QuestionType;
//import com.tls.edututor.exam.testpaper.entity.TestPaper;
//import jakarta.persistence.EntityManager;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.List;
//
//@Component
//@RequiredArgsConstructor
//public class DatabaseInitializer implements CommandLineRunner {
//  private final EntityManager em;
//
//  @Override
//  @Transactional
//  public void run(String... args) throws Exception {
//
//    Long count = em.createQuery("select count(c) from CodeGroup  c", Long.class).getSingleResult();
//    if (count > 0) {
//      System.out.println("코드 그룹 데이터가 이미 존재합니다.");
//    } else {
//      initializeCodeGroups();
//    }
//
//    count = em.createQuery("select count(t) from TestPaper t", Long.class).getSingleResult();
//    if (count > 0) {
//      System.out.println("시험 데이터가 이미 존재합니다.");
//    } else {
//      initializeTestPaperData();
//    }
//  }
//
//  private void initializeCodeGroups() {
//    List<CodeGroup> codeGroups = Arrays.asList(
//            createCodeGroup("1001", "과목"),
//            createCodeGroup("1002", "학기"),
//            createCodeGroup("1003", "학년"),
//            createCodeGroup("1004", "급수"),
//            createCodeGroup("1005", "역할")
//    );
//
//    codeGroups.forEach(em::persist);
//    em.flush();
//
//    createAndPersistCodeDetail("KO", codeGroups.get(0), "국어");
//    createAndPersistCodeDetail("ME", codeGroups.get(0), "수학");
//    createAndPersistCodeDetail("EN", codeGroups.get(0), "영어");
//    createAndPersistCodeDetail("SO", codeGroups.get(0), "사회");
//    createAndPersistCodeDetail("SI", codeGroups.get(0), "과학");
//
//    createAndPersistCodeDetail("FS", codeGroups.get(1), "1학기");
//    createAndPersistCodeDetail("SS", codeGroups.get(1), "2학기");
//
//    createAndPersistCodeDetail("E1", codeGroups.get(2), "초1");
//    createAndPersistCodeDetail("E2", codeGroups.get(2), "초2");
//    createAndPersistCodeDetail("E3", codeGroups.get(2), "초3");
//    createAndPersistCodeDetail("E4", codeGroups.get(2), "초4");
//    createAndPersistCodeDetail("E5", codeGroups.get(2), "초5");
//    createAndPersistCodeDetail("E6", codeGroups.get(2), "초6");
//    createAndPersistCodeDetail("M1", codeGroups.get(2), "중1");
//    createAndPersistCodeDetail("M2", codeGroups.get(2), "중2");
//    createAndPersistCodeDetail("M3", codeGroups.get(2), "중3");
//    createAndPersistCodeDetail("H1", codeGroups.get(2), "고1");
//    createAndPersistCodeDetail("H2", codeGroups.get(2), "고2");
//    createAndPersistCodeDetail("H3", codeGroups.get(2), "고3");
//
//    createAndPersistCodeDetail("EL", codeGroups.get(3), "초등학교");
//    createAndPersistCodeDetail("MI", codeGroups.get(3), "중학교");
//    createAndPersistCodeDetail("HI", codeGroups.get(3), "고등학교");
//
//    createAndPersistCodeDetail("TE", codeGroups.get(4), "선생님");
//    createAndPersistCodeDetail("SU", codeGroups.get(4), "학생");
//    createAndPersistCodeDetail("AD", codeGroups.get(4), "관리자");
//  }
//
//  private void initializeTestPaperData() {
//    TestPaper testPaper = new TestPaper();
//    testPaper.setTitle("기본 수학 시험");
//
//    Question question1 = new Question();
//    question1.setContent("5 + 3의 결과는 무엇인가요?");
//    question1.setType(QuestionType.OBJECTIVE);
//
//    Option option1_1 = new Option();
//    option1_1.setContent("7");
//    option1_1.setIsCorrect(false);
//
//    Option option1_2 = new Option();
//    option1_2.setContent("8");
//    option1_2.setIsCorrect(true);
//
//    Option option1_3 = new Option();
//    option1_3.setContent("9");
//    option1_3.setIsCorrect(false);
//
//    Option option1_4 = new Option();
//    option1_4.setContent("10");
//    option1_4.setIsCorrect(false);
//
//    question1.setOptions(Arrays.asList(option1_1, option1_2, option1_3, option1_4));
//
//    Question question2 = new Question();
//    question2.setContent("10 - 7의 결과는 무엇인가요?");
//    question2.setType(QuestionType.SUBJECTIVE);
//    question2.setAnswerText("3");
//
//    testPaper.setQuestions(List.of(question1, question2));
//
//    em.persist(testPaper);
//    em.flush();
//
//  }
//
//  private CodeGroup createCodeGroup(String id, String name) {
//    CodeGroup codeGroup = CodeGroup.withName()
//            .id(id)
//            .codeGroupName(name)
//            .build();
//    return codeGroup;
//  }
//
//  private void createAndPersistCodeDetail(String code, CodeGroup group, String value) {
//    CodeDetail codeDetail = CodeDetail.withCode()
//            .id(code)
//            .codeGroup(group)
//            .codeDetailValue(value)
//            .build();
//    em.persist(codeDetail);
//  }
//}
