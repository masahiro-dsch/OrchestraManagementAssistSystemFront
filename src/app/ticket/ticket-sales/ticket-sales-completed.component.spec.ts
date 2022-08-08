import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesCompletedComponent } from './ticket-sales-completed.component';

describe('TicketSalesCompletedComponent', () => {
  let component: TicketSalesCompletedComponent;
  let fixture: ComponentFixture<TicketSalesCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSalesCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketSalesCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
