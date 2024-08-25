import { Inject, Injectable } from '@nestjs/common';
// import { ExcelExportService } from './common/utils/excel-export/export.service';
// import { queryDto } from './app.controller';
import { UserService } from './modules/users/users/user.service';
// import { DEFAULT_QUEUE_SERVICE } from './infrastructure/adapters/queue/inject-key';
// import { IDefualtQueue } from './infrastructure/ports/queue/default-queue.interface';
// import { JobNames } from './infrastructure/adapters/queue/bull/constants/queue.constants';
// import { FILE_UPLOAD_SERVICE } from './infrastructure/adapters/file-upload/inject-key';
// import { IFileUpload } from './infrastructure/ports/file-upload/file-upload.interface';

@Injectable()
export class AppService {
  constructor(
    // @Inject(DEFAULT_QUEUE_SERVICE)
    // private readonly _queue: IDefualtQueue<{ username: string }>,

    // @Inject(FILE_UPLOAD_SERVICE)
    // private readonly _uploadService: IFileUpload,

    // private readonly _excelExport: ExcelExportService,
    // private readonly dataq: UserService,
  ) { }
  // async getHello(input: queryDto): Promise<{
  //   tempFilePath: string;
  //   excelName: string;  
  // }> {
  //   const column = [
  //     { header: 'ລະຫັດ', key: 'id', width: 10 },
  //     { header: 'ຊື່', key: 'username', width: 25 },
  //     { header: 'ເບີ', key: 'phone', width: 30 },
  //   ];
  //   const excel = await this._excelExport.exportToExcel(this.dataq, input, column, 'ຊື່ແລະນາມສະກຸນພະນັກງານ')
  //   return excel;
  // }

  // async testQueue(username: string, password: string) {
  //   await this._queue.addJob(JobNames.SendMail, { username })

  // }

  // async logDate(id: number,) {
  //  const user = await this.dataq.getOne(id, 'id');
  //  console.log(user[0].role);
   


  // }

  // async uploadFile(body: any, file: any) {
  //   let upload: string | undefined;
  //   if (file) {
  //     upload = await this._uploadService.upload('/demo-image', file.buffer, file.originalname)
  //   }
  //   console.log(upload);


  // }
}
