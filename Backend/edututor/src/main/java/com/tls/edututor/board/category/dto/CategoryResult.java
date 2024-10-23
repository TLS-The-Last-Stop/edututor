package com.tls.edututor.board.category.dto;

import com.tls.edututor.board.category.entity.Category;
import com.tls.edututor.common.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResult extends BaseEntity {
  private Long id;
  private String name;
  private Long depth;
  private List<CategoryResult> children;

  public CategoryResult(Long id, String name, List<CategoryResult> children) {
    this.id = id;
    this.name = name;
    this.children = children;
  }

  public static List<CategoryResult> resultList(List<Category> categories) {
    List<CategoryResult> roots = new ArrayList<>();
    Map<Long, CategoryResult> map = new HashMap<>();

    for(Category category : categories) {
      CategoryResult result = new CategoryResult(
              category.getId(),
              category.getName(),
              new ArrayList<>()
      );
      map.put(category.getId(), result);

      if(category.getParent() == null) {
        roots.add(result);
      }
    }

    for(Category category : categories) {
      if(category.getParent() != null) {
        CategoryResult parentResult = map.get(category.getParent().getId());
        if(parentResult != null) {
          parentResult.getChildren().add(map.get(category.getId()));
        }
      }
    }
    return roots;
  }
}