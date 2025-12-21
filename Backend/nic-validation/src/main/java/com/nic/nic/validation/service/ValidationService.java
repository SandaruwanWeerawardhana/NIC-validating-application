package com.nic.nic.validation.service;

import com.nic.nic.validation.dto.Validation;
import com.nic.nic.validation.entity.ValidationEntity;
import com.nic.nic.validation.repository.ValidationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ValidationService {
    
    private final ValidationRepository repository;
    private final ModelMapper mapper;
    public ValidationEntity add(Validation request) {
        return repository.save(mapper.map(request, ValidationEntity.class));
    }

    public Validation validateByNic(String nicNumber) {
        ValidationEntity entity = repository.findByNicNumber(nicNumber)
                .orElseThrow(() -> new RuntimeException("NIC not found: " + nicNumber));
        Validation validation = mapper.map(entity, Validation.class);
        validation.setAge(calculateAgeFromNic(entity.getDob()));
        return validation;
    }

    public List<Validation> getAll() {
        List<ValidationEntity> entity = repository.findAll();
        return entity.stream()
                .map(e ->{
                    Validation validation = mapper.map(e, Validation.class);
                    validation.setAge(calculateAgeFromNic(e.getDob()));
                    return validation;
                }).toList();
    }

    private Integer calculateAgeFromNic(LocalDate dob) {
        return Period.between(dob, LocalDate.now()).getYears();
    }

}
