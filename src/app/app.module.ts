import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './router';
import { AppComponent } from './app.component';
import { AppStoreModule } from './store/store.module';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { externalModules } from './build-specific';
import { declarations } from './core';
import {
  HttpClientInMemoryWebApiModule,
  InMemoryDbService,
} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { ConcertService } from './services/concert.service';
import { SeatService } from './services/seat.service';

@NgModule({
  declarations: [AppComponent, AboutComponent, declarations],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes,{
      scrollPositionRestoration: 'enabled', // enabled で有効化
      anchorScrolling: 'enabled', // enabled で有効化  
    }),
    AppStoreModule,
    externalModules,
    //バックエンドと疎通する場合は以下5行をコメントアウト
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 300,
      passThruUnknownUrl: true,
    }),
  ],
  providers: [{ provide: InMemoryDataService, useExisting: InMemoryDbService }, ConcertService, SeatService],
    // providers: [ConcertService, SeatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
