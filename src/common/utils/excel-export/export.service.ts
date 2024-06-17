import { Injectable } from '@nestjs/common';
import { Workbook, Worksheet } from 'exceljs';
import { createWriteStream, unlink } from 'fs';
import { join } from 'path';
import moment from 'moment/moment';
import { IExcelExport } from 'src/common/interface/export.interface';

/**
 * Service for exporting Excel files.
 */
@Injectable()
export class ExcelExportService {
  private readonly fontStyle = {
    name: 'Phetsarath OT',
    size: 12,
    bold: true,
  };
  private readonly bodyFontStyle = {
    name: 'Phetsarath OT',
    size: 12,
    bold: false,
  };
  private readonly borderStyle = {
    top: { style: 'thin', color: { argb: '000000' } },
    left: { style: 'thin', color: { argb: '000000' } },
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } },
  };

  //
  async exportToExcel(
    repo: any,
    input: any,
    column: any,
    name: string,
    pageSize = 100,
  ): Promise<{
    excelName: string;
    tempFilePath: string;
  }> {
    const workbook: Workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Data');
    this.applyHeaderStyles(worksheet, column);
    const excelName = await this.setExcelName(input, name);
    const tempFilePath = join(__dirname, 'temp.xlsx');
    
    const writeStream = createWriteStream(tempFilePath);
    
    await this.populateData(
      worksheet,
      workbook,
      repo,
      input,
      pageSize,
      writeStream,
    );

    writeStream.close();
    return { tempFilePath, excelName };
  }

  //
  private applyHeaderStyles(worksheet: any, column: any): void {
    worksheet.columns = column.map((col: any) => ({
      ...col,
      style: { font: this.fontStyle },
    }));
    worksheet.getRow(1).eachCell((cell: any) => {
      cell.font = this.fontStyle;
      cell.border = this.borderStyle;
    });
     // Protect the worksheet
     worksheet.protect('password', {
      selectLockedCells: true,
      selectUnlockedCells: true,
      formatCells: false,
      formatColumns: false,
      formatRows: false,
      insertColumns: false,
      insertRows: false,
      insertHyperlinks: false,
      deleteColumns: false,
      deleteRows: false,
      sort: false,
      autoFilter: false,
      pivotTables: false,
    });
  }

  private async populateData(
    worksheet: any,
    workbook: any,
    repo: any,
    input: any,
    pageSize: number,
    writeStream: any,
  ): Promise<void> {
    let currentPage = 1;
    let moreData = true;

    while (moreData) {
        
      const data = await repo.getPage(input, currentPage, pageSize);

      if (data.length > 0) {
        for (const item of data) {
          const flattenedItem = await repo.flattenData(item);
          const newRow = worksheet.addRow(flattenedItem);
          newRow.eachCell({ includeEmpty: true }, (cell: any) => {
            cell.border = this.borderStyle;
            cell.font = this.bodyFontStyle
          });
          newRow.commit();
        }
        currentPage++;
      } else {
        moreData = false;
      }

      if (currentPage % 10 === 0 || !moreData) {
        await workbook.xlsx.write(writeStream);
      }
    }
    
  }

  /**
  
   */
  async setExcelName(input: any, name: string): Promise<string> {
    // const { start_date, end_date } = input.input;
    const start_date = '2024-06-12'
    const end_date = '2024-06-12'
    let excelName = name;
    if (start_date && end_date) {
      excelName +=
        start_date === end_date
          ? ` ${moment(start_date).format('DD-MM-YYYY')}`
          : ` ${moment(start_date).format('DD-MM-YYYY')} ຫາ ${moment(
              end_date,
            ).format('DD-MM-YYYY')}`;
    }
    return excelName;
  }

//
  async cleanUpFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      unlink(filePath, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
