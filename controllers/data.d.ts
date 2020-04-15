export interface TableListItem {
  _id: string;
  name: string;
  note: string;
  center:string;
  // updatedAt: Date;
  // createdAt: Date;
  key:number;
  callNo:number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  city?: string;
  name?: string;
  note?: string;
  // key?: number;
  pageSize?: number;
  currentPage?: number;
}
