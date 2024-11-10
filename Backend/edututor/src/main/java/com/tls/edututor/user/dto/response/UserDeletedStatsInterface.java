package com.tls.edututor.user.dto.response;

public interface UserDeletedStatsInterface {
  String getRole();

  Long getTotalCount();

  Long getDeletedCount();

  String getLastDeletedAt();
}
