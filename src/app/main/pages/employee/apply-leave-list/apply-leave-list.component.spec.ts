import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyLeaveListComponent } from './apply-leave-list.component';

describe('ApplyLeaveListComponent', () => {
  let component: ApplyLeaveListComponent;
  let fixture: ComponentFixture<ApplyLeaveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyLeaveListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
