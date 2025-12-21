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
    public String add(Validation request) {
        if(request.getNicNumber().isEmpty() || request.getNicNumber().isBlank()) {
            throw new IllegalArgumentException("NIC number is empty");
        }
        if(repository.existsByNicNumber(request.getNicNumber())) {
            throw new IllegalArgumentException("NIC number already exists: " + request.getNicNumber());
        }

        ValidationEntity entity = mapper.map(request, ValidationEntity.class);
        repository.save(entity);
        return "Validation saved successfully";
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
