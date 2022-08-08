import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Order } from '../../core/model/order';

@Component({
  selector: 'app-order-history-list',
  template: `
  <div *ngIf="!orderHistories?.length">
    <h3 class="subtitle">購入履歴はありません</h3>
  </div>
  <table class="table is-striped" *ngIf="orderHistories.length">
    <thead>
      <tr>
        <th></th>
        <th>注文番号</th>
        <th>演奏会名</th>
        <th>内容</th>
        <th>購入名義</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let orderHistory of orderHistories; trackBy: trackByOrderHistories; let i = index">
        <td>
          <button class="button" (click)="selectOrderHistory(orderHistory)">
            選択
          </button>
        </td>
        <td>{{ orderHistory.id }}</td>
        <td>{{ orderHistory.concertName }}</td>
        <td>
          <div *ngFor="let orderDetail of orderHistory.orderDetail;;">
            {{ orderDetail.floor }}-{{ orderDetail.column }}-{{ orderDetail.number }} : {{ orderDetail.rank }}席
          </div>
        </td>
        <td>{{ orderHistory.nameSei }}{{ orderHistory.nameMei }}</td>
      </tr>
    </tbody>
  </table>
  <app-order-history-detail [orderHistoryDetail]="selectedOrderHistory"></app-order-history-detail>
`,
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryListComponent implements OnInit {
  @Input() orderHistories: Order[];

  public selectedOrderHistory: Order;

  trackByOrderHistories(index: number, orderHistory: Order):number{
    return orderHistory.id;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public selectOrderHistory(order: Order):void{
    this.selectedOrderHistory = order;
  }
}
