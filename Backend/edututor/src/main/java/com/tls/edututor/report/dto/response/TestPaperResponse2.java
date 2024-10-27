package com.tls.edututor.report.dto.response;

import com.tls.edututor.common.entity.BaseEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class TestPaperResponse2 extends BaseEntity {
    private Long id;
    private String title;
    private String courseName;
    private String unitName;
    private LocalDate createAt;
}