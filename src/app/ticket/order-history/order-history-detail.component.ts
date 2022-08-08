import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Order } from 'src/app/core/model/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderHistoryDetailComponent implements OnChanges {
  @Input() public orderHistoryDetail: Order;

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

  constructor(private formBuilder: FormBuilder, private orderService: OrderService) {
  }

  // ngOnInit(): void {
  //   if(this.orderHistoryDetail.orderDetail){
  //     this.orderHistoryDetail.orderDetail.forEach((detail,i) => {
  //       if(i !== 0){
  //         this.orderDetail.push(
  //           this.formBuilder.group({
  //             // floor: ['', Validators.required],
  //             // column: ['', Validators.required],
  //             // number: ['', Validators.required],
  //             // class: ['', Validators.required],  
  //             floor: '',
  //             column: '',
  //             number: '',
  //             class: '',  
  //           })
  //         );           
  //       }
  //     }
  //     )
  //   }
  //   this.orderForm.patchValue(this.orderHistoryDetail);
  // }

  ngOnChanges(): void {
    console.log(this.orderHistoryDetail);
    this.orderDetail = this.formBuilder.array([
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
    ]);
    if(this.orderHistoryDetail){
      this.orderHistoryDetail.orderDetail.forEach((detail,i) => {
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
      }
      )
    }
    this.orderForm.patchValue(this.orderHistoryDetail);
  }


  get orderDetail(): FormArray{
    return this.orderForm.get('orderDetail') as FormArray;
  }

  set orderDetail(array: FormArray){
    this.orderForm.setControl('orderDetail',array);
  }

  cancelOrder():void{
    this.orderService.delete(this.orderHistoryDetail);
    this.orderHistoryDetail = null;
  }
}
