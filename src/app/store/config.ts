import { DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from './../../environments/environment';

const root = environment.API || 'api';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root, // default root path to the server's web api

  entityHttpResourceUrls: {
    Product: {
      // You must specify the root as part of the resource URL.
      entityResourceUrl: `${root}/products/`,
      collectionResourceUrl: `${root}/products/`,
    },
    Concert: {
      // You must specify the root as part of the resource URL.
      entityResourceUrl: `${root}/concerts/`,
      collectionResourceUrl: `${root}/concerts/`,
    },
    Seat: {
      entityResourceUrl: `${root}/seats/`,
      collectionResourceUrl: `${root}/seats/`,
    },
    TotalSales: {
      entityResourceUrl: `${root}/totalSales/`,
      collectionResourceUrl: `${root}/totalSales/`,
    },
    Order: {
      entityResourceUrl: `${root}/orders/`,
      collectionResourceUrl: `${root}/orders/`,
    },
    OrderNumber: {
      entityResourceUrl: `${root}/orderNumber/`,
      collectionResourceUrl: `${root}/orderNumber/`,
    },
  },
};
