import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Concert } from '../core/model/concert';

@Component({
  selector: 'app-concert-menu-list',
  template: `
  <div *ngIf="!concerts?.length">
    Loading data ...
  </div>
  <ul class="list">
    <li
      role="presentation"
      *ngFor="let concert of concerts; trackBy: trackByConcert; let i = index"
    >
      <div class="card">
        <app-concert-card
          [concert]="concert"
        ></app-concert-card>    
      </div>
    </li>
  </ul>
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConcertMenuListComponent{
  @Input() concerts: Concert[];

  trackByConcert(index: number, concert: Concert):number {
    return concert.id;
  }
}
