package com.nic.nic.validation.repository;

import com.nic.nic.validation.entity.NicRecordEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NicRecordRepository extends JpaRepository <NicRecordEntity, Long> {
    Optional<NicRecordEntity> findByNicNumber(String nicNumber);

    boolean existsByNicNumber(@NotBlank(message = "NIC is required") @Pattern(
            regexp = "^(\\d{9}[vVxX]|\\d{12})$",
            message = "NIC must be 9 digits followed by V/X or 12 digits"
    ) String nicNumber);
}
