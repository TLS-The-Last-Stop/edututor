package com.tls.edututor.user.controller;

import com.tls.edututor.common.api.CommonApiResponse;
import com.tls.edututor.school.service.SchoolService;
import com.tls.edututor.user.dto.request.UserTERequest;
import com.tls.edututor.user.service.UserService;
import com.tls.edututor.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {

  private final UserService userService;
  private final SchoolService schoolService;

  @GetMapping("/users/{joinId}")
  public CommonApiResponse<?> checkJoinId(@PathVariable("joinId") String joinId) {
    boolean isAvailable = userService.checkJoinAvailable(joinId);
    if (isAvailable) return CommonApiResponse.createBadRequest("");
    else return CommonApiResponse.createNoContent("");
  }


  @PostMapping("/users")
  public CommonApiResponse<?> join(@RequestBody UserTERequest request) {
    userService.saveUser(request);
    schoolService.save(request.getSchool());
    
    return CommonApiResponse.createNoContent("회원가입이 완료되었습니다.");
  }

}
