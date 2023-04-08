import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesMapComponent } from './tables-map.component';

describe('TablesMapComponent', () => {
  let component: TablesMapComponent;
  let fixture: ComponentFixture<TablesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
