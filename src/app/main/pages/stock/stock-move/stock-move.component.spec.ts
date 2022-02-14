import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMoveComponent } from './stock-move.component';

describe('StockMoveComponent', () => {
  let component: StockMoveComponent;
  let fixture: ComponentFixture<StockMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockMoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
