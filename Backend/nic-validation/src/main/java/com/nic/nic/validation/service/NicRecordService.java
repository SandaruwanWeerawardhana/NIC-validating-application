package com.nic.nic.validation.service;

import com.nic.nic.validation.dto.NicRecord;
import com.nic.nic.validation.entity.NicRecordEntity;
import com.nic.nic.validation.repository.NicRecordRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NicRecordService {
    
    private final NicRecordRepository repository;
    private final ModelMapper mapper;
    public String add(NicRecord request) {
        if(request.getNicNumber().isEmpty() || request.getNicNumber().isBlank()) {
            throw new IllegalArgumentException("NIC number is empty");
        }
        if(repository.existsByNicNumber(request.getNicNumber())) {
            throw new IllegalArgumentException("NIC number already exists: " + request.getNicNumber());
        }

        NicRecordEntity entity = mapper.map(request, NicRecordEntity.class);
        repository.save(entity);
        return "Validation saved successfully";
    }

    public NicRecord validateByNic(String nicNumber) {
        NicRecordEntity entity = repository.findByNicNumber(nicNumber)
                .orElseThrow(() -> new RuntimeException("NIC not found: " + nicNumber));
        NicRecord nicRecord = mapper.map(entity, NicRecord.class);
        nicRecord.setAge(calculateAgeFromNic(entity.getDob()));
        return nicRecord;
    }

    public List<NicRecord> getAll() {
        List<NicRecordEntity> entity = repository.findAll();
        return entity.stream()
                .map(e ->{
                    NicRecord nicRecord = mapper.map(e, NicRecord.class);
                    nicRecord.setAge(calculateAgeFromNic(e.getDob()));
                    return nicRecord;
                }).toList();
    }

    private Integer calculateAgeFromNic(LocalDate dob) {
        return Period.between(dob, LocalDate.now()).getYears();
    }

}
