import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProductsItemComponent } from './associated-products-item.component';

describe('AssociatedProductsItemComponent', () => {
  let component: AssociatedProductsItemComponent;
  let fixture: ComponentFixture<AssociatedProductsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedProductsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedProductsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
