import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketItemsComponent } from './ticket-items.component';

describe('TicketItemsComponent', () => {
  let component: TicketItemsComponent;
  let fixture: ComponentFixture<TicketItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
