import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProductsComponent } from './associated-products.component';

describe('AssociatedProductsComponent', () => {
  let component: AssociatedProductsComponent;
  let fixture: ComponentFixture<AssociatedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
