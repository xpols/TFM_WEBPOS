import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSalesComponent } from './main-sales.component';

describe('MainSalesComponent', () => {
  let component: MainSalesComponent;
  let fixture: ComponentFixture<MainSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
