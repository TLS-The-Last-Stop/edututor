package com.tls.edututor.code.codedetail.controller;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codegroup.service.CodeDetailService;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/code/detail")
public class CodeDetailController {
	private final CodeDetailService codeDetailService;

	@GetMapping
	public CommonApiResponse<List<CodeDetail>> getCodeDetail() {
		return CommonApiResponse.createCreated("codeDetail", codeDetailService.getAllCodeDetail());
	}
}