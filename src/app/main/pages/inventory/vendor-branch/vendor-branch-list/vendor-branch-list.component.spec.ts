import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorBranchListComponent } from './vendor-branch-list.component';

describe('VendorBranchListComponent', () => {
  let component: VendorBranchListComponent;
  let fixture: ComponentFixture<VendorBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorBranchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
