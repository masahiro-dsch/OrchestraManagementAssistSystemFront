import { Injectable, OnDestroy } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Order } from '../core/model/order';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Concert } from '../core/model/concert';
import { ConcertService } from './concert.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends EntityCollectionServiceBase<Order> implements OnDestroy {
   /**
   * データの変更を通知するためのオブジェクト
   * 
   * @private
   * @memberof OrderService
   */
    private workInProgressOrder = new BehaviorSubject<Order>(new Order());

  /**
  * 選択されているConcertを保持するプロパティ
  * 
  */
   public selectedConcert: Concert;

    /**
     * Subscribeするためのプロパティ
     * コンポーネント間で共有するため
     * 
     * @memberof OrderService
     */
    public workInProgressOrder$ = this.workInProgressOrder.asObservable();

    /**
     * subscribeを保持するためのSubscription
     * 
     * @private
     * @type {Subscription}
     * @memberof ticketSalesComponent
     * 
     */
    private concertSubscription!: Subscription;

  /**
   * コンストラクタ
   * 
   * @param serviceElementFactory
   * @memberof OrderService
   */
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory, private concertService: ConcertService) {
    super('Order', serviceElementFactory);
    this.init();
  }

  private init():void{
    /**
     * イベント登録
     * サービスで共有しているデータが更新されたら発火されるイベントをキャッチする。
     */
     this.concertSubscription = this.concertService.sharedDataSelectedConcert$.subscribe(
      msg => {
        this.selectedConcert = msg;
        let initOrder: Order = new Order();
        initOrder.concertID = this.selectedConcert.id;
        initOrder.concertName = this.selectedConcert.title;  
        this.onNotifyWorkInProgressOrder(initOrder);
      }
    );    
  }

  /**
   * コンポーネント終了時の処理
   */
   ngOnDestroy(){
    //リソースリーク防止のため、オブジェクトを破棄する
    this.concertSubscription.unsubscribe();
  }  

  /**
   * データ更新のイベント
   * 
   * @param updated 更新データ（Order型）
   * @memberof OrderService
   */
  public onNotifyWorkInProgressOrder(updated: Order):void{
    this.workInProgressOrder.next(updated);
  }

  /**
   * 注文を確定しサーバに送信する
   * @param order 注文内容
   * @memberof OrderService
   */
  public sendOrder(order: Order):void{
    this.add(order);
    this.onNotifyWorkInProgressOrder(order);
  }

  /**
   * 仕掛り中の注文をリセットする
   * @memberof OrderService
   */
  public resetOrder():void{
    this.onNotifyWorkInProgressOrder(new Order());
  }
}
