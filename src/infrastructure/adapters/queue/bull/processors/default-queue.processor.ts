
import { Process, Processor } from '@nestjs/bull';
import { JobNames } from '../constants/queue.constants';
// import { AppService } from 'src/app.service';

@Processor('defaultQueue')
export class QueueProcessor {
  constructor(
    // private readonly _appService: AppService
  ) { }

  // @Process({ name: JobNames.SendMail })
  // async queueUser(job: { data: { username: string; password: string } }) {
  //   const {username, password} = job.data
  //   await this._appService.testQueue(username, password);
  // }

}
