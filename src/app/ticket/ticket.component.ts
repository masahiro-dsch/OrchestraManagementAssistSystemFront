import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConcertService } from '../services/concert.service';
import { Concert } from '../core/model/concert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket',
  template: `
    <div class="columns is-multiline is-variable">
      <app-ticket-menu class="column is-2"></app-ticket-menu>
      <div class="column is-10">
        <router-outlet></router-outlet>
      </div>
    </div>
`,})
export class TicketComponent implements OnInit {
  /**
  * 選択されているConcertを保持するプロパティ
  * 
  */
   public selectedConcert: Concert;

   /**
    * subscribeを保持するためのSubscription
    * 
    * @private
    * @type {Subscription}
    * @memberof TickeMenuComponent
    * 
    */
   private subscription!: Subscription;
 
   constructor(private concertService: ConcertService){
  }
 
  /**
   * コンポーネントの初期化
   * 
   * @memberof TickeMenuComponent
   */
   ngOnInit() { 
    /**
     * イベント登録
     * サービスで共有しているデータが更新されたら発火されるイベントをキャッチする。
     */
    this.subscription = this.concertService.sharedDataSelectedConcert$.subscribe(
      msg => {
        this.selectedConcert = msg;
      }
    );
  }

  /**
   * コンポーネント終了時の処理
   */
  ngOnDestroy(){
    //リソースリーク防止のため、オブジェクトを破棄する
    this.subscription.unsubscribe();
  }
}
