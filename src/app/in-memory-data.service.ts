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
      title: "第５０回定期演奏会",
      Date: new Date() ,
      description: '毎年の恒例行事です',
      organization: ['ほげほげ交響楽団', 'ふがふが合唱団'],
    },
    {
      id: 20,
      title: "第２５回サマーコンサート",
      Date: new Date() ,
      description: '冷房はありません',
      organization: ['ほげほげ交響楽団', 'もにょもにょ少年合唱団'],
    },
  ];

  const seats: any[] = [
    {
      facilityName: '京都コンサートホール',
      hallName: '大ホール',
      floor: '3F',
      column: 'LA1',
      number: '01',
      class: 'B',
      concertID: 10,
      distributedOrganization: ['ほげほげ交響楽団'],
      isSoled: true,
    },
    {
      facilityName: '京都コンサートホール',
      hallName: '大ホール',
      floor: '3F',
      column: 'LA1',
      number: '02',
      class: 'A',
      concertID: 10,
      distributedOrganization: ['ふがふが合唱団'],
      isSoled: false,
    },
    {
      facilityName: '京都コンサートホール',
      hallName: '大ホール',
      floor: '3F',
      column: 'LA1',
      number: '03',
      class: 'S',
      concertID: 10,
      distributedOrganization: ['ほげほげ交響楽団','ふがふが合唱団'],
      isSoled: false,
    },
  ];

  const totalSales: any[] = [
    {
      id: 1,
      facilityName: '京都コンサートホール',
      hallName: '大ホール',
      concertId: 10,
      organization: 'ほげほげ交響楽団',
      class: 'S',
      numberOfSeats: 10,
      soldSeats: 4,
    },
    {
      id: 2,
      facilityName: '京都コンサートホール',
      hallName: '大ホール',
      concertId: 10,
      organization: 'ほげほげ交響楽団',
      class: 'A',
      numberOfSeats: 20,
      soldSeats: 5,
    },
    {
      id: 3,
      facilityName: '京都コンサートホール',
      hallName: '大ホール',
      concertId: 10,
      organization: 'ほげほげ交響楽団',
      class: 'B',
      numberOfSeats: 30,
      soldSeats: 6,
    },
  ];

  const orders: any[] = [
    {
      id: 10000,
      concertID: 10,
      concertName: '第５０回定期演奏会',
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
      nameSei: '山田',
      nameMei: '太郎',
      postCode: '999-9999',
      address: '京都府京都市左京区吉田本町',
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
