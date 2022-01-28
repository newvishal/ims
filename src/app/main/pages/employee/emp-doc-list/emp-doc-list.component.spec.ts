import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDocListComponent } from './emp-doc-list.component';

describe('EmpDocListComponent', () => {
  let component: EmpDocListComponent;
  let fixture: ComponentFixture<EmpDocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpDocListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
