export interface IBaseSqlResourceModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBaseSoftSqlResourceModel extends IBaseSqlResourceModel {
  deletedAt: Date | null;
}
