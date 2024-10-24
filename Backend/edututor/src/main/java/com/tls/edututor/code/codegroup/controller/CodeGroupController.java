package com.tls.edututor.code.codegroup.controller;

import com.tls.edututor.code.codedetail.service.CodeGroupService;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.common.api.CommonApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/code/group")
public class CodeGroupController {
	private final CodeGroupService codeGroupService;

	@GetMapping
	public CommonApiResponse<List<CodeGroup>> getAllCodeGroups() {
		return CommonApiResponse.createCreated("codeGroup", codeGroupService.getAllCodeGroups());
	}

}
