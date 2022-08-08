import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ConcertService } from '../services/concert.service';
import { Concert } from '../core/model/concert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-concert-card',
  template: `
    <div class="card-content">
      <div class="content">
        <div class="name">{{ concert.title }}</div>
        <div class="description">{{ concert.description }}</div>
        <a routerLink="/products">
          <button type="button" (click)="setSelectedConcert();" class="button is-info is-large is-outlined">練習管理</button>
        </a>
        <a routerLink="/ticket">
          <button type="button" (click)="setSelectedConcert();" class="button is-success is-large is-outlined">チケット管理</button>
        </a>
      </div>
    </div>
  `
})
export class ConcertCardComponent implements OnInit, OnDestroy {
  @Input() concert: Concert;

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

  setSelectedConcert(){
    //ConcertServiceのデータ更新を行う
    this.concertService.onNotifySharedDataSelectedConcert(this.concert);
  }

}
