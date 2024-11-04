package com.tls.edututor.exam.usertest.adapter.impl;

import com.tls.edututor.exam.question.entity.Question;
import com.tls.edututor.exam.usertest.adapter.UserTestAdapter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

@Component
public class UserTestAdapterImpl implements UserTestAdapter {

  private final RestTemplate restTemplate;

  @Value("${edututorAi.api.url}")
  private String gradingApiUrl;

  public UserTestAdapterImpl(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Override
  public boolean evaluateSubjectiveAnswer(String userAnswer, Question question) {
    String studentAnswer = userAnswer;
    String correctAnswer = question.getAnswerText();

    Map<String, String> request = new HashMap<>();
    request.put("sentence1", studentAnswer);
    request.put("sentence2", correctAnswer);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, String>> entity = new HttpEntity<>(request, headers);

    try {
      Map<String, Object> response = restTemplate.postForObject(gradingApiUrl + "/grading/subjective", entity, Map.class);
      if (response != null && response.containsKey("similarity")) {
        double similarity = (Double) response.get("similarity");
        System.out.println("유사도 : " + similarity);
        return similarity >= 0.99;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return false;
  }
}
