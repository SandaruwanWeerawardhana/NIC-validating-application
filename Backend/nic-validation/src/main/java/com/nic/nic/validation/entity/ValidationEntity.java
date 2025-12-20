package com.nic.nic.validation.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
@Entity
@RequiredArgsConstructor
@Table(name = "nic_validation")
public class ValidationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "NIC is required")
    @Pattern(
            regexp = "^(\\d{9}[vVxX]|\\d{12})$",
            message = "NIC must be 9 digits followed by V/X or 12 digits"
    )
    private String nicNumber;

    @NotBlank(message = "DOB is required")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    private String gender;


}
