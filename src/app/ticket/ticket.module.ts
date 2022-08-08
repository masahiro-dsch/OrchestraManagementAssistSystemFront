import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TicketMenuComponent } from './ticket-menu/ticket-menu.component';
import { TicketComponent } from './ticket.component';
import { TotalSalesStatusComponent } from './total-sales-status/total-sales-status.component';
import { TotalSalesStatusListComponent } from './total-sales-status/total-sales-status-list.component';
import { TicketSalesComponent } from './ticket-sales/ticket-sales.component';
import { TicketSalesConfirmComponent } from './ticket-sales/ticket-sales-confirm.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryListComponent } from './order-history/order-history-list.component';
import { TicketSalesCompletedComponent } from './ticket-sales/ticket-sales-completed.component';
import { OrderHistoryDetailComponent } from './order-history/order-history-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
      children:[
        { path: 'total-sales-status', 
          component: TotalSalesStatusComponent
        },
        { path: 'ticket-sales', 
          component: TicketSalesComponent
        },
        { path: 'ticket-sales-confirm', 
          component: TicketSalesConfirmComponent
        },
        { path: 'ticket-sales-completed', 
          component: TicketSalesCompletedComponent
        },
        { path: 'order-history', 
          component: OrderHistoryComponent
        },
      ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    TicketComponent
  ],
  declarations: [
    TicketComponent,
    TicketMenuComponent,
    TotalSalesStatusComponent,
    TotalSalesStatusListComponent,
    TicketSalesComponent,
    TicketSalesConfirmComponent,
    OrderHistoryComponent,
    OrderHistoryListComponent,
    TicketSalesCompletedComponent,
    OrderHistoryDetailComponent,
  ],
})
export class TicketModule { }
