import { Injectable } from '@nestjs/common';
import { ExcelExportService } from './common/utils/excel-export/export.service';
import { queryDto } from './app.controller';
import { UserService } from './modules/users/users/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly _excelExport: ExcelExportService,
    private readonly dataq: UserService
  ) { }
  async getHello(input: queryDto): Promise<{
    tempFilePath: string;
    excelName: string;
  }> {
    const column = [
      { header: 'ລະຫັດ', key: 'id', width: 10 },
      { header: 'ຊື່', key: 'username', width: 25 },
      { header: 'ເບີ', key: 'phone', width: 30 },
    ];
    const excel = await this._excelExport.exportToExcel(this.dataq, input, column, 'ຊື່ແລະນາມສະກຸນພະນັກງານ')
    return excel;
  }
}
