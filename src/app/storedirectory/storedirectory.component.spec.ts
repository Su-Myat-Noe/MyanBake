import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredirectoryComponent } from './storedirectory.component';

describe('StoredirectoryComponent', () => {
  let component: StoredirectoryComponent;
  let fixture: ComponentFixture<StoredirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoredirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoredirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
