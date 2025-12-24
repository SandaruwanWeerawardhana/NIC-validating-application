package com.nic.nic.validation.util;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

/**
 * Utility class for report generation with safe null handling.
 */
public class ReportUtils {
    private ReportUtils() {
        throw new IllegalStateException("Utility class");
    }
    private static final String DEFAULT_VALUE = "N/A";
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static String formatString(String value) {
        return value != null && !value.trim().isEmpty() ? value : DEFAULT_VALUE;
    }

    public static String formatDate(LocalDate date) {
        return date != null ? date.format(DATE_FORMATTER) : DEFAULT_VALUE;
    }

    public static String formatAge(Integer age, LocalDate dob) {
        if (age != null) {
            return age.toString();
        }
        if (dob != null) {
            try {
                int calculatedAge = Period.between(dob, LocalDate.now()).getYears();
                return String.valueOf(calculatedAge);
            } catch (Exception err) {
                return DEFAULT_VALUE;
            }
        }
        return DEFAULT_VALUE;
    }
}


