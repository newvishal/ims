import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForCclComponent } from './for-ccl.component';

describe('ForCclComponent', () => {
  let component: ForCclComponent;
  let fixture: ComponentFixture<ForCclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForCclComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForCclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
