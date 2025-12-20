package com.nic.nic.validation.controller;

import com.nic.nic.validation.dto.Validation;
import com.nic.nic.validation.entity.ValidationEntity;
import com.nic.nic.validation.service.ValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("api/nic/validation")
public class ValidationController {

    private final ValidationService nicService;
    @PostMapping
    public ResponseEntity<ValidationEntity> create(@RequestBody Validation request) {
        ValidationEntity response = nicService.add(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public List<Validation> getAll() {
        return nicService.getAll();
    }
}
