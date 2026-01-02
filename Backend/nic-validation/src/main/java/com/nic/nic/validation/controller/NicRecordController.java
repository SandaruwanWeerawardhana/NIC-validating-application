package com.nic.nic.validation.controller;

import com.nic.nic.validation.dto.NicRecord;
import com.nic.nic.validation.service.NicRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
@RequestMapping("api/nic")
public class NicRecordController {

    private final NicRecordService nicService;

    @PostMapping("/validate")
    public ResponseEntity<NicRecord> validateByNic(@RequestParam("nic") String nic) {
        NicRecord response = nicService.validateByNic(nic);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get")
    public List<NicRecord> getAll() {
        return nicService.getAll();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

}
