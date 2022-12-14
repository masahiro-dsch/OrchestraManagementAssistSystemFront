/**
 * Hero-oriented InMemoryDbService with method overrides.
 */
import { Injectable } from '@angular/core';
import {
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
} from 'angular-in-memory-web-api';

/** In-memory database data */
interface Db {
  [collectionName: string]: any[];
}

@Injectable()
export class InMemoryDataService {
  /** True if in-mem service is intercepting; all requests pass thru when false. */
  active = true;

  /** In-memory database data */
  db: Db = {};

  /** Create the in-memory database on start or by command */
  createDb(reqInfo?: RequestInfo) {
    this.db = getDbData();

    if (reqInfo) {
      const body = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      if (body.clear === true) {
        // tslint:disable-next-line:forin
        for (const coll in this.db) {
          this.db[coll].length = 0;
        }
      }

      this.active = !!body.active;
    }
    return this.db;
  }

  /**
   * Override `parseRequestUrl`
   * Manipulates the request URL or the parsed result.
   * If in-mem is inactive, clear collectionName so that service passes request thru.
   * If in-mem is active, after parsing with the default parser,
   * @param url from request URL
   * @param utils for manipulating parsed URL
   */
  parseRequestUrl(url: string, utils: RequestInfoUtilities): ParsedRequestUrl {
    const parsed = utils.parseRequestUrl(url);
    parsed.collectionName = this.active
      ? mapCollectionName(parsed.collectionName)
      : undefined;
    return parsed;
  }
}

/**
 * Remap a known singular collection name ("hero")
 * to the plural collection name ("heroes"); else return the name
 * @param name - collection name from the parsed URL
 */
function mapCollectionName(name: string): string {
  return (
    ({
      hero: 'heroes',
      villain: 'villains',
    } as any)[name] || name
  );
}

/**
 * Development data
 */
function getDbData() {
  const products: any[] = [
    {
      id: 10,
      name: 'Strawberries',
      description: '16oz package of fresh organic strawberries',
      quantity: '1',
    },
    {
      id: 20,
      name: 'Sliced bread',
      description: 'Loaf of fresh sliced wheat bread',
      quantity: 1,
    },
    {
      id: 30,
      name: 'Apples',
      description: 'Bag of 7 fresh McIntosh apples',
      quantity: 1,
    },
  ];

  const concerts: any[] = [
    {
      id: 10,
      title: "???????????????????????????",
      Date: new Date() ,
      description: '???????????????????????????',
      organization: ['????????????????????????', '?????????????????????'],
    },
    {
      id: 20,
      title: "????????????????????????????????????",
      Date: new Date() ,
      description: '????????????????????????',
      organization: ['????????????????????????', '?????????????????????????????????'],
    },
  ];

  const seats: any[] = [
    {
      facilityName: '??????????????????????????????',
      hallName: '????????????',
      floor: '3F',
      column: 'LA1',
      number: '01',
      class: 'B',
      concertID: 10,
      distributedOrganization: ['????????????????????????'],
      isSoled: true,
    },
    {
      facilityName: '??????????????????????????????',
      hallName: '????????????',
      floor: '3F',
      column: 'LA1',
      number: '02',
      class: 'A',
      concertID: 10,
      distributedOrganization: ['?????????????????????'],
      isSoled: false,
    },
    {
      facilityName: '??????????????????????????????',
      hallName: '????????????',
      floor: '3F',
      column: 'LA1',
      number: '03',
      class: 'S',
      concertID: 10,
      distributedOrganization: ['????????????????????????','?????????????????????'],
      isSoled: false,
    },
  ];

  const totalSales: any[] = [
    {
      id: 1,
      facilityName: '??????????????????????????????',
      hallName: '????????????',
      concertId: 10,
      organization: '????????????????????????',
      class: 'S',
      numberOfSeats: 10,
      soldSeats: 4,
    },
    {
      id: 2,
      facilityName: '??????????????????????????????',
      hallName: '????????????',
      concertId: 10,
      organization: '????????????????????????',
      class: 'A',
      numberOfSeats: 20,
      soldSeats: 5,
    },
    {
      id: 3,
      facilityName: '??????????????????????????????',
      hallName: '????????????',
      concertId: 10,
      organization: '????????????????????????',
      class: 'B',
      numberOfSeats: 30,
      soldSeats: 6,
    },
  ];

  const orders: any[] = [
    {
      id: 10000,
      concertID: 10,
      concertName: '???????????????????????????',
      orderDetail: [
        {
          floor: '3F',
          column: 'LA1',
          number: '01',
          class: 'B'
        },
        {
          floor: '3F',
          column: 'LA1',
          number: '02',
          class: 'A'
        },
      ],
      userID: 'taro',
      nameSei: '??????',
      nameMei: '??????',
      postCode: '999-9999',
      address: '???????????????????????????????????????',
      mail: 'test@domain.com',
      phone: '0120-999-999',
      orderDate: new Date(),
      payMethod: 'furikomi',
      payStatus: 'no',
      passMethod: 'yuso',
      passStatus: 'no'
    },
  ];

  const orderNumber: any[] = [ 
  {
    id: 1,
    orderNumber: 999,
  }];

  return { products, concerts, seats, totalSales, orders, orderNumber } as Db;
}
