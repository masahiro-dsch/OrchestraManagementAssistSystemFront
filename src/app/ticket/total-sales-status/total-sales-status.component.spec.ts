import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalesStatusComponent } from './total-sales-status.component';

describe('TotalSalesStatusComponent', () => {
  let component: TotalSalesStatusComponent;
  let fixture: ComponentFixture<TotalSalesStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSalesStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSalesStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
