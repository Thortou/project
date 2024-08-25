import { Body, Controller, Get, Inject, Param, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { ExcelExportService } from './common/utils/excel-export/export.service';
import { table } from './modules/excel/repository';
import { Public } from './common/decorators/public.decorator';
import { createReadStream } from 'fs';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './modules/users/users/user.service';
import { CACHE_SERVICE } from './infrastructure/adapters/cache/inject-key';
import { ICache } from './infrastructure/ports/cache/cache.interface';
import { secondsToMilliseconds } from './common/utils/covert-time';
import { LOGGER_SERVICE } from './infrastructure/adapters/logger/inject-keys';
import { ILogger } from './infrastructure/ports/logger/logger.interface';

export class queryDto {
  username: string;
  amountSent?: number;
}
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly _excelExport: ExcelExportService,
    private readonly userService: UserService,
    @Inject(CACHE_SERVICE) private iCache: ICache<queryDto>,
    @Inject(LOGGER_SERVICE) private readonly logger: ILogger,

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

  // @Public()
  // @Post('queue')
  // async testQueue(@Body() input: any) {
  //   const { username, password } = input
  //   return await this.appService.testQueue(username, password)
  // }

  // @Public()
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
  //   return await this.appService.uploadFile(body, file)
  // }


  // @Public()
  // @Get('log/:id')
  // async logData(@Param('id') id: number) {
  //    const user = await this.userService.getOne(1, 'id')
  //    console.log(user.roles[0].permissions[0].name);

  // }
  @Public()
  @Post('cache')
  async logData(@Body() body: any) {
    const { username, password } = body
    if (username !== 'admin') {
      console.log('not found username');
    }
    else if (password !== "1234") {
      await this.lockPhone(username);
      // this.logger.error(
      //   `[Password Error]`,
      //   password,
      // );
    } else if (password) {
      await this.iCache.delete(username)
      console.log('logined...');
    }
    // await this.iCache.set(`set ${username}`, { username }, secondsToMilliseconds(400))
    // await this.lockPhone(username);
    // await this.lockSend(username);
  }
  private async lockSend(username: string) {
    const lockPayload = await this.iCache.get(`LOCK_${username}`);

    if (lockPayload) {
      if (lockPayload.amountSent >= 6) {
        console.log('CAN_NOT_SENT_OTP_IN_HOURS');

      }
    }

    const payload = await this.iCache.get(`LOCK_SEND_${username}`);

    if (payload) {
      console.log('CAN_NOT_SENT_OTP_IN_30_SEC');
    }

    await this.iCache.set(
      `LOCK_SEND_${username}`,
      { username },
      secondsToMilliseconds(30),
    );
  }

  private async lockPhone(username: string) {
    const payload = await this.iCache.get(`LOCK_${username}`);
    // console.log(payload);

    if (payload) {
      if (payload.amountSent >= 6) {
        // return {message: 'CAN_NOT_SENT_OTP_IN_HOURS'}
        console.log('CAN_NOT_SENT_OTP_IN_HOURS');

      }

      await this.iCache.set(
        `LOCK_${username}`,
        {
          username,
          amountSent: payload.amountSent + 1,
        },
        secondsToMilliseconds(30),
      );

      return "ok";
    }

    await this.iCache.set(
      `LOCK_${username}`,
      {
        username,
        amountSent: 1,
      },
      // secondsToMilliseconds(30),
    );
  }

}

