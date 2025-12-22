package com.nic.nic.validation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NicRecord {

    private Long id;

    @NotBlank(message = "NIC is required")
    @Pattern(
            regexp = "^(\\d{9}[vVxX]|\\d{12})$",
            message = "NIC must be 9 digits followed by V/X or 12 digits"
    )
    private String nicNumber;

    @NotNull(message = "DOB is required")
    private LocalDate dob;

    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;
}
