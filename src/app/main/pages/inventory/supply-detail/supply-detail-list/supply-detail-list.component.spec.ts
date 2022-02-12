import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyDetailListComponent } from './supply-detail-list.component';

describe('SupplyDetailListComponent', () => {
  let component: SupplyDetailListComponent;
  let fixture: ComponentFixture<SupplyDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyDetailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
