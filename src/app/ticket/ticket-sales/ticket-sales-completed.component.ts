import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-sales-completed',
  template:`
  <h2 class="title">注文完了</h2>
  <h3>注文は完了しました。左側のメニューよりお戻りください。</h3>
  `
})
export class TicketSalesCompletedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
