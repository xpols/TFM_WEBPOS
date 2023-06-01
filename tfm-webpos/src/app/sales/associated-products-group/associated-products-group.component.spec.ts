import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProductsGroupComponent } from './associated-products-group.component';

describe('AssociatedProductsGroupComponent', () => {
  let component: AssociatedProductsGroupComponent;
  let fixture: ComponentFixture<AssociatedProductsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedProductsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedProductsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
