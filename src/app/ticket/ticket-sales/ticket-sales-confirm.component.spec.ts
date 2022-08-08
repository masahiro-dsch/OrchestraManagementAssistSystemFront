import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesConfirmComponent } from './ticket-sales-confirm.component';

describe('TicketSalesConfirmComponent', () => {
  let component: TicketSalesConfirmComponent;
  let fixture: ComponentFixture<TicketSalesConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSalesConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSalesConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
