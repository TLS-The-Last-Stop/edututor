package com.tls.edututor.exam.usertest.repository;

import com.tls.edututor.exam.usertest.entity.UserTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserTestRepository extends JpaRepository<UserTest, Long> {
  @Query("SELECT ut FROM UserTest ut JOIN FETCH ut.shareTest st WHERE st.testPaper.id = :testPaperId")
  List<UserTest> findByTestPaperId(Long testPaperId);

  long countByShareTestTestPaperId(Long testPaperId);

  boolean existsByShareTestId(Long shareTestId);

}
