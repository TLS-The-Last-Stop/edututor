package com.tls.edututor.code.codedetail.service.impl;

import com.tls.edututor.code.codedetail.entity.CodeDetail;
import com.tls.edututor.code.codedetail.repository.CodeDetailRepository;
import com.tls.edututor.code.codegroup.service.CodeDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CodeDetailServiceImpl implements CodeDetailService {
	private final CodeDetailRepository codeDetailRepository;

	@Override
	public List<CodeDetail> getAllCodeDetail() {
		return codeDetailRepository.findAll();
	}
}