
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { OrderBy } from './order-by.dto';
import { ICursorPaginate } from '../interface/paginated.interface';

export enum DATA_TYPE {
  'PAGINATION' = 'pagination',
  'CURSOR_PAGINATION' = 'cursor_pagination',
}

export class PaginationDto<Entity> extends OrderBy<Entity> {
//   @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'validation.IS_INT' })
  @Transform(({ value }) => parseInt(value))
  limit?: number;

//   @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message:'validation.IS_INT' })
  @Transform(({ value }) => parseInt(value))
  page?: number;

//   @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'validation.IS_INT' })
  @Transform(({ value }) => parseInt(value))
  offset?: number;
}

export class CursorPaginateDto implements ICursorPaginate {
//   @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'validation.IS_INT' })
  @Transform(({ value }) => parseInt(value))
  cursor: number;

//   @ApiProperty({ required: false })
  @IsOptional()
  @IsInt({ message: 'validation.IS_INT' })
  @Transform(({ value }) => parseInt(value))
  page_size?: number;
}
