import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowDetailPreloadComponent } from './row-detail-preload.component';

describe('RowDetailPreloadComponent', () => {
  let component: RowDetailPreloadComponent;
  let fixture: ComponentFixture<RowDetailPreloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowDetailPreloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowDetailPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
