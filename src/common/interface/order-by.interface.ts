export enum SortOrder {
    Desc = 'DESC',
    Asc = 'ASC',
  }
  
  export interface IOrderBy<Column> {
    column: Column;
    sortOrder: SortOrder;
  }