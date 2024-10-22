package com.tls.edututor.common.api;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommonApiResponse<T> {

  public static final int OK = 200;
  public static final int CREATED = 201;
  public static final int NO_CONTENT = 204;
  public static final int BAD_REQUEST = 400;
  public static final int UNAUTHORIZED = 401;
  public static final int FORBIDDEN = 403;
  public static final int NOT_FOUND = 404;
  public static final int INTERNAL_SERVER_ERROR = 500;
  public static final int SERVICE_UNAVAILABLE = 503;
  public static final int DB_ERROR = 600;

  private int status;
  private String message;
  private T data;

  public CommonApiResponse(int status, String message, T data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public static <T> CommonApiResponse<T> createSuccess(String message, T data) {
    return new CommonApiResponse<>(OK, message, data);
  }

  public static <T> CommonApiResponse<T> createCreated(String message, T data) {
    return new CommonApiResponse<>(CREATED, message, data);
  }

  public static CommonApiResponse<Void> createNoContent(String message) {
    return new CommonApiResponse<>(NO_CONTENT, message, null);
  }

  public static CommonApiResponse<Void> createBadRequest(String message) {
    return new CommonApiResponse<>(BAD_REQUEST, message, null);
  }

  public static CommonApiResponse<Void> createUnauthorized(String message) {
    return new CommonApiResponse<>(UNAUTHORIZED, message, null);
  }

  public static CommonApiResponse<Void> createForbidden(String message) {
    return new CommonApiResponse<>(FORBIDDEN, message, null);
  }

  public static CommonApiResponse<Void> createNotFound(String message) {
    return new CommonApiResponse<>(NOT_FOUND, message, null);
  }

  public static CommonApiResponse<Void> createInternalServerError(String message) {
    return new CommonApiResponse<>(INTERNAL_SERVER_ERROR, message, null);
  }

  public static CommonApiResponse<Void> createServiceUnavailable(String message) {
    return new CommonApiResponse<>(SERVICE_UNAVAILABLE, message, null);
  }

  public static CommonApiResponse<Void> createDBError(String message) {
    return new CommonApiResponse<>(DB_ERROR, message, null);
  }

  private static <T> CommonApiResponse<T> createResponse(int status, String message, T data) {
    return new CommonApiResponse<>(status, message, data);
  }

  public static CommonApiResponse<Void> createSuccessWithNoContent(String message) {
    return new CommonApiResponse<>(OK, message, null);
  }

  public static <T> CommonApiResponse<T> createError(String message) {
    return new CommonApiResponse<>(BAD_REQUEST, message, null);
  }
}
