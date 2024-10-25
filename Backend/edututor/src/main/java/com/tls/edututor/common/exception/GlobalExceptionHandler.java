package com.tls.edututor.common.exception;

import com.tls.edututor.common.api.CommonApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<CommonApiResponse<Void>> handleGenericException() {
    return ResponseEntity.status(CommonApiResponse.INTERNAL_SERVER_ERROR)
            .body(CommonApiResponse.createInternalServerError("서버 오류"));
  }

  @ExceptionHandler(NoResourceFoundException.class)
  public CommonApiResponse<Void> handleNoResourceFoundException(NoResourceFoundException ex, WebRequest request) {
    return CommonApiResponse.createNotFound("༼ つ ◕_◕ ༽つ 요청경로가 이상함 여기 아닌듯 : " + request.getDescription(false));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  public CommonApiResponse<Void> handleBadRequestException(IllegalArgumentException ex) {
    return CommonApiResponse.createBadRequest("(┬┬﹏┬┬) 서버에서 뭔가 잘못됨 ㅅㄱ    " + ex.getMessage());
  }

  @ExceptionHandler(DuplicateUserException.class)
  public CommonApiResponse<Void> handleDuplicateUserException(DuplicateUserException ex) {
    return CommonApiResponse.createBadRequest("왓더쀀 ㅠㅠ 이미 가입했어용!" + ex.getMessage());
  }

}
