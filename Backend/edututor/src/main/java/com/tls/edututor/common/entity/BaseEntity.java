package com.tls.edututor.common.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

  @CreatedDate
  @Column(name = "CREATED_AT", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "UPDATED_AT")
  private LocalDateTime updatedAt;

  @Column(name = "WRITER")
  private Long writer;

  @Column(name = "UPDATER")
  private Long updater;

  @Column(name = "IS_DELETED", nullable = false)
  private Boolean isDeleted;

  @PrePersist
  protected void onCreate() {
    if (this.isDeleted == null) {
      this.isDeleted = false;
    }
  }

}
