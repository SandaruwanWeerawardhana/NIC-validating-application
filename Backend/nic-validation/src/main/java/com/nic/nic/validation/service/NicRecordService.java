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
    public NicRecord validateByNic(String nicNumber) {
        String nic = normalizeNic(nicNumber);

        if (nic.isBlank()) {
            throw new IllegalArgumentException("NIC number is empty");
        }
        if (!isValidOldNic(nic) && !isValidNewNic(nic)) {
            throw new IllegalArgumentException("Invalid NIC format: " + nicNumber);
        }

        LocalDate dob = extractDobFromNic(nic);
        String gender = extractGenderFromNic(nic);
        Integer age = calculateAgeFromDob(dob);

        NicRecordEntity entity = repository.findByNicNumber(nic).orElseGet(NicRecordEntity::new);
        entity.setNicNumber(nic);
        entity.setDob(dob);
        entity.setGender(gender);
        entity.setAge(age);

        NicRecordEntity saved = repository.save(entity);

        return mapper.map(saved, NicRecord.class);
    }

    private String normalizeNic(String nicNumber) {
        return nicNumber == null ? "" : nicNumber.trim().toUpperCase();
    }

    private boolean isValidNewNic(String nic) {
        return nic.matches("\\d{12}");
    }

    private boolean isValidOldNic(String nic) {
        return nic.matches("\\d{9}[VX]");
    }

    private LocalDate extractDobFromNic(String nic) {
        int year;
        int dayOfYear;

        if (isValidNewNic(nic)) {
            year = Integer.parseInt(nic.substring(0, 4));
            dayOfYear = Integer.parseInt(nic.substring(4, 7));
        } else if (isValidOldNic(nic)) {
            int yearSuffix = Integer.parseInt(nic.substring(0, 2));
            year = (yearSuffix <= 29) ? (2000 + yearSuffix) : (1900 + yearSuffix);
            dayOfYear = Integer.parseInt(nic.substring(2, 5));
        } else {
            throw new IllegalArgumentException("Invalid NIC format: " + nic);
        }

        if (dayOfYear > 500) {
            dayOfYear -= 500;
        }
        if (dayOfYear < 1 || dayOfYear > 366) {
            throw new IllegalArgumentException("Invalid day-of-year in NIC: " + nic);
        }

        return LocalDate.ofYearDay(year, dayOfYear);
    }

    private String extractGenderFromNic(String nic) {
        int dayCode = isValidNewNic(nic)
                ? Integer.parseInt(nic.substring(4, 7))
                : Integer.parseInt(nic.substring(2, 5));

        if (dayCode >= 1 && dayCode <= 366) {
            return "MALE";
        }

        if (dayCode >= 501 && dayCode <= 866) {
            return "FEMALE";
        }

        throw new IllegalArgumentException("Invalid day code for gender in NIC: " + nic);
    }

    private Integer calculateAgeFromDob(LocalDate dob) {
        return Period.between(dob, LocalDate.now()).getYears();
    }

    public List<NicRecord> getAll() {
        List<NicRecordEntity> entity = repository.findAll();
        return entity.stream()
                .map(e -> mapper.map(e, NicRecord.class))
                .toList();
    }
}
