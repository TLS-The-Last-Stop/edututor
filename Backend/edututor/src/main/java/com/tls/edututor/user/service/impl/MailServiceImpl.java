package com.tls.edututor.user.service.impl;

import com.tls.edututor.user.dto.request.FindUserRequest;
import com.tls.edututor.user.entity.User;
import com.tls.edututor.user.repository.UserRepository;
import com.tls.edututor.user.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

  private final UserRepository userRepository;
  private final JavaMailSender mailSender;
  private final PasswordEncoder passwordEncoder;

  private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
  private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static final String DIGITS = "0123456789";
  private static final String SPECIAL = "!@#$%";

  @Value("${spring.mail.username}")
  private String from;

  private void sendEmail(String to, String subject, String text) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setFrom(from);
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    mailSender.send(message);
  }

  @Override
  @Transactional(readOnly = true)
  public void findLoginId(FindUserRequest request) {
    User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new BadCredentialsException("AUTH001"));

    String subject = "[에듀튜터] 아이디 찾기 안내";
    String text = String.format(
            "안녕하세요. 에듀튜터입니다.\n\n" +
                    "요청하신 아이디 찾기 결과를 알려드립니다.\n" +
                    "회원님의 아이디는 [ %s ] 입니다.\n\n" +
                    "감사합니다.",
            user.getLoginId()
    );

    try {
      sendEmail(request.getEmail(), subject, text);
    } catch (MailSendException mse) {
      mse.printStackTrace();
      throw new MailSendException("이메일 발송 중 오류가 발생했습니다.");
    }
  }

  @Override
  @Transactional
  public void findPassword(FindUserRequest request) {
    User user = userRepository.findByLoginIdAndEmail(request.getLoginId(), request.getEmail()).orElseThrow(() -> new BadCredentialsException("AUTH001"));
    String newPassword = generateRandomPassword();
    user.updateUserPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);

    String subject = "[에듀튜터] 비밀번호 찾기 안내";
    String text = String.format(
            "안녕하세요. 에듀튜터입니다.\n\n" +
                    "요청하신 비밀번호 찾기 결과를 알려드립니다.\n" +
                    "회원님의 비밀번호는 [ %s ] 입니다.\n\n" +
                    "감사합니다.",
            newPassword
    );

    try {
      sendEmail(request.getEmail(), subject, text);
    } catch (MailSendException mse) {
      throw new MailSendException("이메일 발송 중 오류가 발생했습니다.");
    }
  }

  private String generateRandomPassword() {
    SecureRandom random = new SecureRandom();
    StringBuilder sb = new StringBuilder();

    // 최소 요구사항 추가
    sb.append(LOWER.charAt(random.nextInt(LOWER.length()))); // 소문자 1개
    sb.append(UPPER.charAt(random.nextInt(UPPER.length()))); // 소문자 1개
    sb.append(DIGITS.charAt(random.nextInt(DIGITS.length()))); // 소문자 1개
    sb.append(SPECIAL.charAt(random.nextInt(SPECIAL.length()))); // 소문자 1개

    // 12자리
    String allChars = LOWER + UPPER + DIGITS + SPECIAL;
    for (int i = 4; i < 12; i++) sb.append(allChars.charAt(random.nextInt(allChars.length())));

    char[] newPassword = sb.toString().toCharArray();
    for (int i = newPassword.length - 1; i > 0; i--) {
      int j = random.nextInt(i + 1);
      char temp = newPassword[i];
      newPassword[i] = newPassword[j];
      newPassword[j] = temp;
    }

    return String.valueOf(newPassword);
  }

}
