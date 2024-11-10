package com.tls.edututor.course.course.dto.request;

import com.tls.edututor.course.section.dto.request.SectionRegisterRequest;
import com.tls.edututor.course.unit.dto.request.UnitRegisterRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class RequestMapper {

  public static Map<String, Object> toMap(CourseRegisterRequest request) {
    Map<String, Object> map = new HashMap<>();
    map.put("classroomId", request.getClassroomId());
    map.put("courseName", request.getCourseName());
    map.put("groupCode", request.getGroupCode());
    map.put("imageUrl", request.getImageUrl());

    if (request.getSections() != null) {
      map.put("sections", request.getSections().stream()
              .map(RequestMapper::toMap)
              .collect(Collectors.toList()));
    }
    return map;
  }

  public static Map<String, Object> toMap(SectionRegisterRequest request) {
    Map<String, Object> map = new HashMap<>();
    map.put("content", request.getContent());
    map.put("writer", request.getWriter());

    if (request.getUnits() != null) {
      map.put("units", request.getUnits().stream()
              .map(RequestMapper::toMap)
              .collect(Collectors.toList()));
    }
    return map;
  }

  public static Map<String, Object> toMap(UnitRegisterRequest request) {
    Map<String, Object> map = new HashMap<>();
    map.put("content", request.getContent());
    map.put("writer", request.getWriter());
    return map;
  }
}

