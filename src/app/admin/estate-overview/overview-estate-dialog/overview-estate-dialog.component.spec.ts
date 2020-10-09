import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewEstateDialogComponent } from './overview-estate-dialog.component';

describe('OverviewEstateDialogComponent', () => {
  let component: OverviewEstateDialogComponent;
  let fixture: ComponentFixture<OverviewEstateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewEstateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewEstateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
