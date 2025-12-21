package com.nic.nic.validation.repository;

import com.nic.nic.validation.entity.ValidationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ValidationRepository extends JpaRepository <ValidationEntity, Long> {
    Optional<ValidationEntity> findByNicNumber(String nicNumber);
}
