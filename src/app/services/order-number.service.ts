import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Order } from '../core/model/order';
import { OrderNumber } from '../core/model/order-number';

@Injectable({
  providedIn: 'root'
})
export class OrderNumberService extends EntityCollectionServiceBase<OrderNumber> {
  public currentNumber: number;
  public updateNumber: OrderNumber;

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('OrderNumber', serviceElementsFactory);
  }

  public increment():void{
    this.getByKey(1).subscribe(
      msg => {
        this.currentNumber = msg.orderNumber;
        this.currentNumber++;
        this.updateNumber = new OrderNumber();
        this.updateNumber.id = 1;
        this.updateNumber.orderNumber = this.currentNumber;
        // this.update(this.updateNumber);
      }
    )
  }
}
