import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TotalSales } from '../../core/model/total-sales';

@Component({
  selector: 'app-total-sales-status-list',
  template: `
  <div *ngIf="!totalSales?.length">
    Loading data ...
  </div>
  <table class="table is-striped">
  <thead>
    <tr>
      <th>団体名</th>
      <th>席種</th>
      <th>設定席数</th>
      <th>販売席数</th>
      <th>進捗</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let totalSale of totalSales; trackBy: trackByTotalSales; let i = index">
      <td>{{ totalSale.organization }}</td>
      <td>{{ totalSale.class }}</td>
      <td>{{ totalSale.numberOfSeats }}</td>
      <td>{{ totalSale.soldSeats }}</td>
      <td>{{ calculateProgress(totalSale) }}%</td>
    </tr>
  </tbody>
</table>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalSalesStatusListComponent implements OnInit {
  @Input() totalSales: TotalSales[];

  trackByTotalSales(index: number, totalSale: TotalSales):number{
    return totalSale.id;
  }

  constructor() { }

  ngOnInit(): void {
  }

  calculateProgress(totalSale: TotalSales): string{
    // return totalSale.calculateProgress();
    return TotalSales.calculateProgress(totalSale.soldSeats, totalSale.numberOfSeats);
  }

}
