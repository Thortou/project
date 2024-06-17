export interface IExcelExport {
    getPage(input: any, page: number, pageSize: number): Promise<any[]>;
  
    flattenData(item: any): Promise<any>;
  }