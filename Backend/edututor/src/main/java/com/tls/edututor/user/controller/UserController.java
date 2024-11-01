package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.user.dto.request.UserSURequest;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Slf4j
public class UserController {

  private final UserService userService;

  @GetMapping("/{loginId}")
  public CommonApiResponse<?> checkLoginId(@PathVariable("loginId") String loginId) {
    boolean isAvailable = userService.checkJoinAvailable(loginId);
    if (isAvailable) return CommonApiResponse.createBadRequest("");
    else return CommonApiResponse.createNoContent("");
  }


  @PostMapping("/teachers")
  public CommonApiResponse<?> createTeacher(@RequestBody UserTERequest request) {
    userService.saveTeacher(request);
    return CommonApiResponse.createNoContent("회원가입이 완료되었습니다.");
  }

  @PostMapping("/students")
  public CommonApiResponse<?> createStudent(@RequestBody UserSURequest request, Authentication authentication) {
    userService.saveStudent(request, authentication);
    return CommonApiResponse.createNoContent("학생 등록이 완료되었습니다.");
  }

  @RequestMapping(path = "/students/{studentId}", method = {RequestMethod.PUT, RequestMethod.PATCH})
  public CommonApiResponse<?> updateStudent(@RequestBody UserSURequest request, @PathVariable("studentId") Long id) {
    userService.updateStudent(request, id);
    return CommonApiResponse.createNoContent("학생 수정이 완료되었습니다.");
  }

  @DeleteMapping("/students/{studentId}")
  public CommonApiResponse<?> deleteStudent(@PathVariable("studentId") Long id) {
    userService.deleteStudent(id);
    return CommonApiResponse.createNoContent("학생 계정 삭제가 완료되었습니다.");
  }

}
