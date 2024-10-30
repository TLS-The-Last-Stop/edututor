package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

  private final UserService userService;

  @GetMapping("/users/{loginId}")
  public CommonApiResponse<?> checkLoginId(@PathVariable("loginId") String loginId) {
    boolean isAvailable = userService.checkJoinAvailable(loginId);
    if (isAvailable) return CommonApiResponse.createBadRequest("");
    else return CommonApiResponse.createNoContent("");
  }


  @PostMapping("/users/teachers")
  public CommonApiResponse<?> createTeacher(@RequestBody UserTERequest request) {
    userService.saveTeacher(request);
    return CommonApiResponse.createNoContent("회원가입이 완료되었습니다.");
  }

  @PostMapping("/users/students")
  public CommonApiResponse<?> createStudent(@RequestBody UserSURequest request) {
    userService.saveStudent(request);
    return CommonApiResponse.createNoContent("학생 등록이 완료되었습니다.");
  }

}
