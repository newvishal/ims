import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVendorBranchComponent } from './add-edit-vendor-branch.component';

describe('AddEditVendorBranchComponent', () => {
  let component: AddEditVendorBranchComponent;
  let fixture: ComponentFixture<AddEditVendorBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditVendorBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVendorBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
