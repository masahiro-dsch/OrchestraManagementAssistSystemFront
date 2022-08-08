import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/core/model/order';
import { OrderService } from '../../services/order.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-sales-confirm',
  templateUrl: './ticket-sales-confirm.component.html',
})
export class TicketSalesConfirmComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private router: Router) {
  }

  ngOnInit(): void {
    /**
     * イベント登録
     * サービスで共有しているデータが更新されたら発火されるイベントをキャッチする。
     */
    this.orderSubscription = this.orderService.workInProgressOrder$.subscribe(
      msg => {
        this.workInProgressOrder = msg;
        // this.orderForm.setValue(this.workInProgressOrder);
        if(this.workInProgressOrder.orderDetail){
          this.workInProgressOrder.orderDetail.forEach((detail,i) => {
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

  onSubmit(): void{
    this.orderService.sendOrder(this.workInProgressOrder);
    this.orderService.resetOrder();
    this.router.navigate(['./ticket/ticket-sales-completed']);
  }
}
