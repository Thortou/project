import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityTarget } from 'typeorm';
import moment from 'moment';
import { Connect_DB } from '../enum/connect-ennum';

@Injectable()
export class UniqueIDService {
  constructor(
    @InjectDataSource(Connect_DB.MAIN)
    private _dataSource: DataSource,
  ) {}

  private async isUnique<T>(
    id: string,
    modelName: EntityTarget<T>,
    tableName: string,
    columnName: string,
  ): Promise<boolean> {
    const existingId = await this._dataSource
      .getRepository(modelName)
      .createQueryBuilder(tableName)
      .where(`${tableName}.${columnName} = :id`, { id })
      .getOne();

    return !existingId;
  }

  private generateDateTimeBasedID(): string {
    const dateTimePart = moment().format('YYYYMMDDHHmmSSS');
    let randomPart: number;
    do {
      randomPart = Math.floor(Math.random() * 900) + 100; // Generate a random 3-digit number between 100 and 999
    } while (randomPart % 10 === 0); // Ensure it doesn't end with 0
    return dateTimePart + randomPart.toString();
  }

  async generateUniqueID<T>(
    length = 8,
    type: 'numeric' | 'alpha_numeric' | 'datetime_based' = 'alpha_numeric',
    modelName: EntityTarget<T>,
    tableName: string,
    columnName: string,
    prefix = '',
    postfix = '',
    retries = 3,
  ): Promise<string> {
    let uniqueId: string;
    do {
      if (type === 'datetime_based') {
        uniqueId = this.generateDateTimeBasedID();
      } else {
        const charset = this.getCharset(type);
        uniqueId = this.generateCandidateID(length, charset);
      }

      if (prefix) {
        uniqueId = prefix + uniqueId;
      }

      if (postfix) {
        uniqueId = uniqueId + postfix;
      }

      if (await this.isUnique(uniqueId, modelName, tableName, columnName)) {
        return uniqueId;
      }

      retries--;
    } while (retries > 0);

    throw new Error('FAILED_TO_GENERATE_A_UNIQUE_ID');
  }

  private generateCandidateID(length: number, charset: string): string {
    return Array.from(
      { length },
      () => charset[Math.floor(Math.random() * charset.length)],
    ).join('');
  }

  private getCharset(type: 'numeric' | 'alpha_numeric'): string {
    if (type === 'numeric') {
      return '0123456789';
    } else {
      return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
  }
}
