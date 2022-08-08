import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConcertService } from '../../services/concert.service';
import { Concert } from '../../core/model/concert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-menu',
  template: `
    <nav class="menu">
      <p class="menu-label">{{ selectedConcert.title }}</p>
      <p class="menu-label">チケット管理</p>
      <ul class="menu-list">
        <li>
          <a routerLink="./total-sales-status" routerLinkActive="router-link-active">
            売上全体の状況
          </a>
        </li>
        <li>
          <a routerLink="./ticket-sales" routerLinkActive="router-link-active">
            チケット購入
          </a>
        </li>
        <li>
          <a routerLink="./order-history" routerLinkActive="router-link-active">
            購入済みチケット確認
          </a>
        </li>
      </ul>
    </nav>
`
})
export class TicketMenuComponent implements OnInit, OnDestroy {
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
