import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartOfCityDialogComponent } from './add-part-of-city-dialog.component';

describe('AddPartOfCityDialogComponent', () => {
  let component: AddPartOfCityDialogComponent;
  let fixture: ComponentFixture<AddPartOfCityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartOfCityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartOfCityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
