package com.tls.edututor.common.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerCheckController {

  @GetMapping("/server-check")
  public String serverCheck() {
    return "OK";
  }
}
