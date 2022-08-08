import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConcertMenuComponent } from './concert-menu.component';
import { ConcertMenuListComponent} from './concert-menu-list.component';
import { ConcertCardComponent } from './concert-card.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ConcertMenuComponent,
  },
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ConcertMenuComponent
  ],
  declarations: [
    ConcertMenuComponent,
    ConcertMenuListComponent,
    ConcertCardComponent
  ]
})
export class ConcertMenuModule { }
