import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldenQuarksComponent } from './golden-quarks.component';

describe('GoldenQuarksComponent', () => {
  let component: GoldenQuarksComponent;
  let fixture: ComponentFixture<GoldenQuarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldenQuarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldenQuarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
