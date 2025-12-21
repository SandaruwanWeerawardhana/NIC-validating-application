package com.nic.nic.validation.controller;

import com.nic.nic.validation.dto.Validation;
import com.nic.nic.validation.entity.ValidationEntity;
import com.nic.nic.validation.service.ValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("api/nic")
public class ValidationController {

    private final ValidationService nicService;
    @PostMapping("/add")
    public ResponseEntity<ValidationEntity> create(@RequestBody Validation request) {
        ValidationEntity response = nicService.add(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/validate")
    public ResponseEntity<Validation> validateByNic(@RequestParam("nic") String nic) {
        Validation response = nicService.validateByNic(nic);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public List<Validation> getAll() {
        return nicService.getAll();
    }

}
