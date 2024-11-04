package com.tls.edututor.exam.usertest.adapter;

import com.tls.edututor.exam.question.entity.Question;

public interface UserTestAdapter {
  boolean evaluateSubjectiveAnswer(String userAnswer, Question question);
}
