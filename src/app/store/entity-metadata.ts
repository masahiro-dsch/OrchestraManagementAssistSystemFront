import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Product: {},
  Concert: {},
  Seat: {},
  TotalSales: {},
  Order: {},
  OrderNumber: {},
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};
