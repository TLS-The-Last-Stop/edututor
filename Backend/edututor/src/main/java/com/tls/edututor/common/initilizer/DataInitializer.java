package com.tls.edututor.common.initilizer;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.codegroup.repository.CodeGroupRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class DataInitializer {

  @Bean
  public ApplicationRunner initializer(CodeGroupRepository codeGroupRepository, CodeDetailRepository codeDetailRepository) {
    return args -> {
      if (codeGroupRepository.count() > 0) {
        return;
      }

      AtomicInteger codeGroupIdCounter = new AtomicInteger(1);

      List<String> levels = Arrays.asList("초등학교", "중학교", "고등학교");
      List<String> elementaryYears = Arrays.asList("1학년", "2학년", "3학년", "4학년", "5학년", "6학년");
      List<String> middleHighYears = Arrays.asList("1학년", "2학년", "3학년");
      List<String> semesters = Arrays.asList("1학기", "2학기");
      List<String> subjects = Arrays.asList("국어", "수학", "영어", "사회", "과학", "역사", "도덕");

      levels.forEach(level -> {
        List<String> applicableYears = level.equals("초등학교") ? elementaryYears : middleHighYears;
        applicableYears.forEach(year -> {
          semesters.forEach(semester -> {
            subjects.forEach(subject -> {
              int codeGroupId = codeGroupIdCounter.getAndIncrement();
              CodeGroup codeGroup = codeGroupRepository.save(
                      new CodeGroup(null, "과정코드그룹-" + codeGroupId, null));
              codeDetailRepository.saveAll(Arrays.asList(
                      new CodeDetail(null, 1001, codeGroupId, subject, codeGroup),
                      new CodeDetail(null, 1002, codeGroupId, semester, codeGroup),
                      new CodeDetail(null, 1003, codeGroupId, year, codeGroup),
                      new CodeDetail(null, 1004, codeGroupId, level, codeGroup)
              ));
            });
          });
        });
      });
    };
  }
}
