import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatinerComponent } from './conatiner.component';

describe('ConatinerComponent', () => {
  let component: ConatinerComponent;
  let fixture: ComponentFixture<ConatinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConatinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConatinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
