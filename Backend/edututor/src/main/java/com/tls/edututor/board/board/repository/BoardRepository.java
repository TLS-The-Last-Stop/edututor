package com.tls.edututor.board.board.repository;

import com.tls.edututor.board.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
  List<Board> findByCategoryIdOrderByIdDesc(Long categoryId);

  @Query("SELECT b \n" +
          "FROM Board b\n" +
          "JOIN Category c ON b.category.id = c.id\n" +
          "WHERE c.id = :categoryId \n" +
          "   OR c.parent.id = :categoryId")
  List<Board> findByCategoryIdIncludingChildren(Long categoryId);

  @Query("SELECT b FROM Board b WHERE b.category.id = :categoryId " +
          "AND (LOWER(b.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) " +
          "OR LOWER(b.content) LIKE LOWER(CONCAT('%', :searchQuery, '%')))")
  List<Board> findByCategoryIdAndSearch(@Param("categoryId") Long categoryId,
                                        @Param("searchQuery") String searchQuery);

  @Query("SELECT DISTINCT b FROM Board b " +
          "LEFT JOIN b.category c " +
          "LEFT JOIN c.parent p " +
          "WHERE (c.id = :categoryId OR p.id = :categoryId) " +
          "AND (LOWER(b.title) LIKE LOWER(CONCAT('%', :searchQuery, '%')) " +
          "OR LOWER(b.content) LIKE LOWER(CONCAT('%', :searchQuery, '%')))")
  List<Board> findByCategoryIdIncludingChildrenAndSearch(
          @Param("categoryId") Long categoryId,
          @Param("searchQuery") String searchQuery);
}