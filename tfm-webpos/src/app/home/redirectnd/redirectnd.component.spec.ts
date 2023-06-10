import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectndComponent } from './redirectnd.component';

describe('RedirectndComponent', () => {
  let component: RedirectndComponent;
  let fixture: ComponentFixture<RedirectndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
