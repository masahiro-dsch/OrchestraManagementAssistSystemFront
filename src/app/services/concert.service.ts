import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Concert } from '../core/model/concert';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcertService extends EntityCollectionServiceBase<Concert>{
  /**
   * データの変更を通知するためのオブジェクト
   * 
   * @private
   * @memberof ConcertService
   */
  private sharedDataSelectedConcert = new BehaviorSubject<Concert>(new Concert(null, null, null,null,null));

  /**
   * Subscribeするためのプロパティ
   * コンポーネント間で共有するため
   * 
   * @memberof ConcertService
   */
  public sharedDataSelectedConcert$ = this.sharedDataSelectedConcert.asObservable();

  /**
   * コンストラクタ
   * ServiceではOnInitは使えないため、コンストラクタで初期化処理（init()）を行う。
   * @param serviceElementsFactory 
   * @memberof ConcertService
   */
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Concert', serviceElementsFactory);
    this.init();
  }

  private init():void{
    if(sessionStorage.getItem('selectedConcert')){
      let selectedConcert: Concert = <Concert>JSON.parse(sessionStorage.getItem('selectedConcert'));
      this.onNotifySharedDataSelectedConcert(selectedConcert);
    }
  }

  /**
   * データ更新のイベント
   * 
   * @param updated 更新データ（Concert型）
   * @memberof ConcertService
   */
  public onNotifySharedDataSelectedConcert(updated: Concert){
    this.sharedDataSelectedConcert.next(updated);
    sessionStorage.setItem('selectedConcert', JSON.stringify(updated));
  }
}
