import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingRequestOverviewComponent } from './advertising-request-overview.component';

describe('AdvertisingRequestOverviewComponent', () => {
  let component: AdvertisingRequestOverviewComponent;
  let fixture: ComponentFixture<AdvertisingRequestOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingRequestOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingRequestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
