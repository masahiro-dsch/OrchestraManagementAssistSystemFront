import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConcertService } from 'src/app/services/concert.service';
import { Concert } from '../model/concert';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Top Menu</p>
      <ul class="menu-list">
        <li>
          <a routerLink="/products" routerLinkActive="router-link-active">
            Products
          </a>
        </li>
        <li>
          <a routerLink="/about" routerLinkActive="router-link-active">
            About
          </a>
        </li>
        <li>
          <a routerLink="/concerts" routerLinkActive="router-link-active">
            演奏会一覧
          </a>
<!--            <ul>
              <li *ngIf="selectedConcert.title">
                {{ selectedConcert.title }}
              </li>
            </ul>
-->
        </li>
      </ul>
    </nav>
  `,
})
export class NavComponent implements OnInit, OnDestroy{
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
   * @memberof ConcertCardComponent
   * 
   */
  private subscription!: Subscription;

  constructor(private concertService: ConcertService){
  }

  /**
   * コンポーネントの初期化
   * 
   * @memberof ConcertCardComponent
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
