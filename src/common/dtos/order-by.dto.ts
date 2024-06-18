
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../interface/order-by.interface';

export class OrderBy<Entity> {
//   @ApiProperty({
//     required: false,
//     description: 'column to sort',
//     type: 'string',
//   })
  @IsOptional()
  @IsString({ message: 'validation.IS_STRING' })
  column: keyof Entity;

//   @ApiProperty({ required: false, enum: SortOrder, description: 'sort order' })
@IsOptional()

@IsEnum(SortOrder, {
    message: `Sort order must be one of the following: ${Object.values(SortOrder).join(', ')}.`,
  })
  sort_order: SortOrder;
}