package com.tls.edututor.code.codegroup.service.impl;

import com.tls.edututor.code.codedetail.service.CodeGroupService;
import com.tls.edututor.code.codegroup.entity.CodeGroup;
import com.tls.edututor.code.repository.CodeGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CodeGroupServiceImpl implements CodeGroupService {
	private final CodeGroupRepository codeGroupRepository;

	@Override
	public List<CodeGroup> getAllCodeGroups() {
		return codeGroupRepository.findAll();
	}
}