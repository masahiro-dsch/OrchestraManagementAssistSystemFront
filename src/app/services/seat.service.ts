import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Seat } from '../core/model/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService extends EntityCollectionServiceBase<Seat>{

  /**
   * コンストラクタ
   * 
   * @param serviceElementsFactory
   * @memberof SeatService
   */
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory) {
    super('Seat', serviceElementFactory);
   }
}
