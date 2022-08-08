import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TotalSales } from 'src/app/core/model/total-sales';
import { TotalSalesService } from '../../services/total-sales.service';

@Component({
  selector: 'app-total-sales-status',
  template: `
  <h2 class="title">売上全体の状況</h2>
  <h3>団体別</h3>
  <div *ngIf="totalSales$ | async as totalSales">
    <app-total-sales-status-list [totalSales]="totalSales"></app-total-sales-status-list>
  </div>
`
})
export class TotalSalesStatusComponent implements OnInit {
  public totalSales$: Observable<TotalSales[]>;

  constructor(private totalSalesService: TotalSalesService) {
    this.totalSales$ = totalSalesService.entities$;
  }

  ngOnInit(): void {
    this.totalSalesService.getAll();
  }
}
