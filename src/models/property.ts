import { IBaseSqlResourceModel } from './baseSql';

export interface IProperty extends IBaseSqlResourceModel, IPropertyUpsertData {
  text: string;
}

export interface IPropertyUpsertData {
  text: string;
}
