package com.tls.edututor.common.exception;

import com.tls.edututor.common.api.CommonApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonApiResponse<Void>> handleGenericException(Exception ex) {
    return ResponseEntity.status(CommonApiResponse.INTERNAL_SERVER_ERROR)
            .body(CommonApiResponse.createInternalServerError("서버 오류"));
  }
}
