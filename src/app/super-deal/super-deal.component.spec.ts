import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperDealComponent } from './super-deal.component';

describe('SuperDealComponent', () => {
  let component: SuperDealComponent;
  let fixture: ComponentFixture<SuperDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
