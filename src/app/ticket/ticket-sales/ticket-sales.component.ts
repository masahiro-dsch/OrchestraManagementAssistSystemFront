import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/core/model/order';
import { OrderService } from '../../services/order.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderNumberService } from '../../services/order-number.service';
import { Concert } from 'src/app/core/model/concert';
import { ConcertService } from 'src/app/services/concert.service';

@Component({
  selector: 'app-ticket-sales',
  templateUrl: './ticket-sales.component.html',
})
export class TicketSalesComponent implements OnInit, OnDestroy {
  /**
  * 入力途中のFormを保持するプロパティ
  * 
  */
   public workInProgressOrder: Order;

  /**
   * subscribeを保持するためのSubscription
   * 
   * @private
   * @type {Subscription}
   * @memberof ticketSalesComponent
   * 
   */
  private orderSubscription!: Subscription;

  /**
   * 
   */
  orderForm = this.formBuilder.group({
    id: new FormControl<number>(null),
    concertID: new FormControl<number>(null),
    concertName: '',
    orderDetail: this.formBuilder.array([
      this.formBuilder.group({
        // floor: ['', Validators.required],
        // column: ['', Validators.required],
        // number: ['', Validators.required],
        // class: ['', Validators.required],  
        floor: '',
        column: '',
        number: '',
        rank: '',  
      })
    ]),
    userID: '',
    nameSei: '',
    nameMei: '',
    postCode: '',
    address: '',
    mail: '',
    phone: '',
    orderDate: new FormControl<Date>(null),
    payMethod: '',
    payStatus: '',
    passMethod: '',
    passStatus: '',
  })

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private router: Router, private orderNumberService: OrderNumberService, private concertService: ConcertService) {

  }

  ngOnInit(): void {
    /**
     * イベント登録
     * サービスで共有しているデータが更新されたら発火されるイベントをキャッチする。
     */    
    this.orderSubscription = this.orderService.workInProgressOrder$
    .subscribe(
      msg => {
        this.workInProgressOrder = msg;
        this.orderNumberService.getByKey(1).subscribe(
          res => {
            this.workInProgressOrder.id = res.orderNumber;
            this.workInProgressOrder.orderDate = new Date();
            this.workInProgressOrder.payStatus = 'no';
            this.workInProgressOrder.passStatus = 'no';
            if(this.workInProgressOrder.orderDetail){
              this.workInProgressOrder.orderDetail.forEach((detail,i) => {
                // console.log(i);
                if(i !== 0){
                  this.orderDetail.push(
                    this.formBuilder.group({
                      // floor: ['', Validators.required],
                      // column: ['', Validators.required],
                      // number: ['', Validators.required],
                      // class: ['', Validators.required],  
                      floor: '',
                      column: '',
                      number: '',
                      rank: '',  
                    })
                  );
                }
              });
            }
            this.orderForm.patchValue(this.workInProgressOrder);
            //次の処理は注文番号を一つ進める。バックエンドができたらそちらでインクリメントするので、不要。
            this.orderNumberService.increment();
          }
        )    
      }
    );
  }

  /**
   * コンポーネント終了時の処理
   */
   ngOnDestroy(){
    //リソースリーク防止のため、オブジェクトを破棄する
    this.orderSubscription.unsubscribe();
  }  

  get orderDetail(): FormArray{
    return this.orderForm.get('orderDetail') as FormArray;
  }

  addOrderDetail(){
    this.orderDetail.push(
      this.formBuilder.group({
        // floor: ['', Validators.required],
        // column: ['', Validators.required],
        // number: ['', Validators.required],
        // class: ['', Validators.required],  
        floor: '',
        column: '',
        number: '',
        rank: '',  
      })
    );
  }

  public deleteOrderDetail(i:number):void{
    this.orderDetail.removeAt(i);
  }

  onSubmit(): void{
    this.workInProgressOrder = <Order>this.orderForm.value;
    //データ更新を行う
    this.orderService.onNotifyWorkInProgressOrder(this.workInProgressOrder);
    this.router.navigate(['./ticket/ticket-sales-confirm'], {fragment:'top'});
    console.log(JSON.stringify(this.orderForm.value));
  }
}
