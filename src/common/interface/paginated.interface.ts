import { IOrderBy } from './order-by.interface';

export interface IPagination<Entity, Filter = any> {
  limit?: number;
  page?: number;
  offset?: number;
  filter?: Partial<Filter>;
  orderBy?: IOrderBy<keyof Entity>;
}

export interface IPaginated<Entity> {
  limit?: number;
  page?: number;
  offset?: number;
  total: number;
  page_size?: number;
  data: Entity[];
}

export interface ICursorPaginate<Filter = any> {
  cursor: number;
  page_size?: number;
  filter?: Partial<Filter>;
}

export interface ICursorPaginated<Entity> extends ICursorPaginate {
  cursor: number;

  page_size?: number;

  data: Entity[];
}
