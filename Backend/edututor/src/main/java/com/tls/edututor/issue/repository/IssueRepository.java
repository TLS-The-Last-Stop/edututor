package com.tls.edututor.issue.repository;
import com.tls.edututor.issue.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

}
