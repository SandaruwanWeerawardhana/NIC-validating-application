package com.nic.nic.validation.service;

import com.nic.nic.validation.dto.Validation;
import com.nic.nic.validation.entity.ValidationEntity;
import com.nic.nic.validation.repository.ValidationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ValidationService {
    
    private final ValidationRepository repository;
    private final ModelMapper mapper;
    public ValidationEntity add(Validation request) {
        return repository.save(mapper.map(request, ValidationEntity.class));
    }

    public List<Validation> getAll() {
        List<ValidationEntity> entity = repository.findAll();
        return entity.stream()
                .map(e -> mapper.map(e, Validation.class))
                .toList();
    }
}
