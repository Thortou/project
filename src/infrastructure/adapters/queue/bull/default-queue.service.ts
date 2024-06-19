
import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IDefualtQueue } from 'src/infrastructure/ports/queue/default-queue.interface';

@Injectable()
export class DefaultQueueService<Payload> implements IDefualtQueue<Payload> {
  constructor(
    @InjectQueue('defaultQueue') private readonly queue: Queue,
    // @Inject(CACHE_SERVICE) private readonly cacheService: ICache<any>,
  ) {}

  async addJob(
    jobName: string,
    data: Payload,
    cacheTTL = 86400000,
  ): Promise<void> {
    try {
      // const jobIdentifier = this.cacheService.generateJobIdentifier(
      //   jobName,
      //   data,
      // );
      // const existingJob = await this.cacheService.get(jobIdentifier);
      // if (existingJob) {
      //   return;
      // }
      await this.queue.add(jobName, data);
      // await this.cacheService.set(jobIdentifier, true, cacheTTL);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(message)
    }
  }
}
