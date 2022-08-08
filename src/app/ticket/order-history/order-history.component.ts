import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../core/model/order';

@Component({
  selector: 'app-order-history',
  template: `
  <h2 class="title">購入履歴</h2>
  <div *ngIf="orderHistories$ | async as orderHistories">
    <app-order-history-list [orderHistories]="orderHistories"></app-order-history-list>
  </div>
`})
export class OrderHistoryComponent implements OnInit {
  public orderHistories$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orderHistories$ = orderService.entities$;
  }

  ngOnInit(): void {
    this.orderService.getAll();
  }
}
