package com.nic.nic.validation.service;

import com.nic.nic.validation.dto.NicRecord;
import com.nic.nic.validation.entity.NicRecordEntity;
import com.nic.nic.validation.repository.NicRecordRepository;
import com.nic.nic.validation.util.ReportUtils;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ExcelReportService {

    private final NicRecordRepository repository;
    private final ModelMapper modelMapper;

    @Async
    public CompletableFuture<byte[]> generateExcelReport() throws Exception {

        List<NicRecordEntity> entities = repository.findAll();
        List<NicRecord> records = entities.stream()
                .map(entity -> modelMapper.map(entity, NicRecord.class))
                .toList();

        try (
                Workbook workbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
        ) {

            Sheet sheet = workbook.createSheet("NIC Records");

            Row headerRow = sheet.createRow(0);
            headerRow.createCell(0).setCellValue("NIC");
            headerRow.createCell(1).setCellValue("Birthday");
            headerRow.createCell(2).setCellValue("Age");
            headerRow.createCell(3).setCellValue("Gender");

            int rowIndex = 1;
            for (NicRecord nicRecord : records) {
                addExcelRow(sheet, rowIndex++, nicRecord);
            }

            for (int i = 0; i < 4; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(outputStream);

            return CompletableFuture.completedFuture(outputStream.toByteArray());
        }
    }

    private void addExcelRow(Sheet sheet, int rowIndex, NicRecord nicRecord) {
        Row row = sheet.createRow(rowIndex);
        row.createCell(0).setCellValue(ReportUtils.formatString(nicRecord.getNicNumber()));
        row.createCell(1).setCellValue(ReportUtils.formatDate(nicRecord.getDob()));
        row.createCell(2).setCellValue(ReportUtils.formatAge(nicRecord.getAge(), nicRecord.getDob()));
        row.createCell(3).setCellValue(ReportUtils.formatString(nicRecord.getGender()));
    }
}
