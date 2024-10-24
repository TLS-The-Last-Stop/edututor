package com.tls.edututor.board.board.repository;

import com.tls.edututor.board.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
  @Query("select b from Board b where b.category.id =:categoryId")
  List<Board> findByCategoryId(Long categoryId);

  @Query("SELECT b \n" +
          "FROM Board b\n" +
          "JOIN Category c ON b.category.id = c.id\n" +
          "WHERE c.id = :categoryId \n" +
          "   OR c.parent.id = :categoryId")
  List<Board> findByCategoryIdIncludingChildren(Long categoryId);
}