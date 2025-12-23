package com.nic.nic.validation.service;

import com.nic.nic.validation.dto.NicRecord;
import com.nic.nic.validation.entity.NicRecordEntity;
import com.nic.nic.validation.repository.NicRecordRepository;
import com.nic.nic.validation.util.ReportUtils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.openpdf.text.*;
import org.openpdf.text.Font;
import org.openpdf.text.pdf.PdfPCell;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class PdfReportService {

    private final NicRecordRepository repository;
    private final ModelMapper modelMapper;
    @Async
    public CompletableFuture<byte[]> generatePdfReport() {

   List<NicRecordEntity> entities = repository.findAll();
           List<NicRecord> records = entities.stream()
                   .map(entity -> modelMapper.map(entity, NicRecord.class))
                   .toList();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);

        PdfWriter.getInstance(document, outputStream);
        document.open();

        Font titleFont = new Font(Font.HELVETICA, 16, Font.BOLD);
        Paragraph title = new Paragraph("NIC Validation Report", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph(" "));

        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);

        addHeader(table, "NIC");
        addHeader(table, "Birthday");
        addHeader(table, "Age");
        addHeader(table, "Gender");

        for (NicRecord entry : records) {
            addTableRow(table, entry);
        }
        document.add(table);
        document.close();

        return CompletableFuture.completedFuture(outputStream.toByteArray());
    }

    private void addTableRow(PdfPTable table, NicRecord nicRecord) {
        table.addCell(ReportUtils.formatString(nicRecord.getNicNumber()));
        table.addCell(ReportUtils.formatDate(nicRecord.getDob()));
        table.addCell(ReportUtils.formatAge(nicRecord.getAge(), nicRecord.getDob()));
        table.addCell(ReportUtils.formatString(nicRecord.getGender()));
    }

    private void addHeader(PdfPTable table, String text) {
        PdfPCell cell = new PdfPCell(new Phrase(text));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBackgroundColor(Color.LIGHT_GRAY);
        table.addCell(cell);
    }
}
