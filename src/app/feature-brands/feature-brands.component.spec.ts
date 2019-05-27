import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureBrandsComponent } from './feature-brands.component';

describe('FeatureBrandsComponent', () => {
  let component: FeatureBrandsComponent;
  let fixture: ComponentFixture<FeatureBrandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureBrandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
