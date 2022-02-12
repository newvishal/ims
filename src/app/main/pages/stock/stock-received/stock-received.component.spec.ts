import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReceivedComponent } from './stock-received.component';

describe('StockReceivedComponent', () => {
  let component: StockReceivedComponent;
  let fixture: ComponentFixture<StockReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
