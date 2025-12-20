package com.nic.nic.validation.repository;

import com.nic.nic.validation.entity.ValidationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValidationRepository extends JpaRepository <ValidationEntity, Long> {
}
