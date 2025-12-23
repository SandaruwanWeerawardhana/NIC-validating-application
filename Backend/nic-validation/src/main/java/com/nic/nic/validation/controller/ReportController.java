package com.nic.nic.validation.controller;

import com.nic.nic.validation.service.ExcelReportService;
import com.nic.nic.validation.service.PdfReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/nic/report")
@RequiredArgsConstructor
public class ReportController {

    private final PdfReportService pdfService;
    private final ExcelReportService excelService;

    @GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadPdf() throws Exception {

        byte[] pdf = pdfService.generatePdfReport().get();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=nic-report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/excel")
    public ResponseEntity<byte[]> downloadExcel() throws Exception {

        byte[] excel = excelService.generateExcelReport().get();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=nic-report.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(excel);
    }
}
