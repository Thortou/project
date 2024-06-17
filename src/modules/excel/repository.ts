export interface table {
    getPage(
      input: any,
      page: number,
      PageSize: number,
    ): Promise<any[]>;
  
    flattenData(item: any): any;
  }