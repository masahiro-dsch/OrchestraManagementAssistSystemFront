import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from '../core/model/concert';
import { ConcertService } from '../services/concert.service';

@Component({
  selector: 'app-concert-menu',
  template: `
  <div class="content-container">
    <app-list-header
      title="演奏会を選択して下さい"
      (refresh)="getConcerts()"
    ></app-list-header>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" *ngIf="concerts$ | async as concerts">
        <app-concert-menu-list [concerts]="concerts"></app-concert-menu-list>
      </div>
    </div>
  </div>
`
})
export class ConcertMenuComponent implements OnInit {
  concerts$: Observable<Concert[]>;

  constructor(private concertService: ConcertService) {
    this.concerts$ = concertService.entities$;
  }

  ngOnInit(): void {
    this.getConcerts();
  }

  getConcerts(): void{
    this.concertService.getAll();
  }
}
