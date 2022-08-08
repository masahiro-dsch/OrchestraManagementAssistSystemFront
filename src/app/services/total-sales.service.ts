import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { TotalSales } from '../core/model/total-sales';

@Injectable({
  providedIn: 'root'
})
export class TotalSalesService extends EntityCollectionServiceBase<TotalSales>{
  /**
   * コンストラクタ
   * 
   * @param serviceElementsFactory
   * @memberof TotalSalesService
   */
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) { 
    super('TotalSales', serviceElementFactory);
  }
}
