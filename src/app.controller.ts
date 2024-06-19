import { Body, Controller, Get, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ExcelExportService } from './common/utils/excel-export/export.service';
import { table } from './modules/excel/repository';
import { Public } from './common/decorators/public.decorator';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

export class queryDto {
  search: string;
  lname: string
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _excelExport: ExcelExportService,

  ) { }
  EXCEL_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  // @Public()
  // @Get()
  // async getHello(): Promise<string>{
  //   const data = [
  //     {id: 1, fname: 'tou', lname:'thor', gender: 'm'},
  //     {id: 2, fname: 'see', lname:'lor', gender: 'f'},
  //     {id: 3, fname: 'you', lname:'her', gender: 'm'},
  //     {id: 4, fname: 'naly', lname:'yang', gender: 'f'},
  //     {id: 5, fname: 'malee', lname:'xiong', gender: 'f'},
  //     {id: 6, fname: 'janny', lname:'vang', gender: 'm'},
  //     {id: 7, fname: 'john', lname:'chang', gender: 'm'},
  //     {id: 8, fname: 'dee', lname:'khang', gender: 'm'},
  //     {id: 9, fname: 'souk', lname:'vue', gender: 'm'},
  //     {id: 10, fname: 'kafe', lname:'lee', gender: 'm'},
  //     {id: 11, fname: 'latlee', lname:'her', gender: 'm'},
  //   ]

  //   const column = [
  //     { header: 'ລະຫັດ', key: 'id', width: 10 },
  //     { header: 'ຊື່', key: 'fname', width: 25 },
  //     { header: 'ນາມສະກຸນ', key: 'lname', width: 15 },
  //     { header: 'ເພດ', key: 'gender', width: 25 },
  //   ];
  //   await this._excelExport.exportToExcel( 'kkkk', data, column, 'ຊື່ແລະນາມສະກຸນ ພະນັກງານ')
  //   return this.appService.getHello();
  // }

  // @Public()
  // @Get('export')
  // async exportExcel(
  //   @Query() input: queryDto,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   try {
  //     const { tempFilePath, excelName } = await this.appService.getHello(input);
  //     console.log(tempFilePath); 

  //     const readStream = createReadStream(tempFilePath);
  //     res.setHeader('Content-Type', this.EXCEL_MIME_TYPE);
  //     const encodedFilename = encodeURIComponent(excelName + '.xlsx');
  //     res.setHeader(
  //       'Content-Disposition',
  //       `attachment; filename*=UTF-8''${encodedFilename}`,
  //     );
  //     readStream.pipe(res);
  //     readStream.on('error', (err) => {
  //       this._excelExport.cleanUpFile(tempFilePath);
  //       throw err;
  //     });
  //     readStream.on('end', () => {
  //       this._excelExport.cleanUpFile(tempFilePath);
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Public()
  @Post('queue')
  async testQueue(@Body() input: any) {
    const { username, password } = input
    return await this.appService.testQueue(username, password)
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    return await this.appService.uploadFile(body, file)
  }

}

