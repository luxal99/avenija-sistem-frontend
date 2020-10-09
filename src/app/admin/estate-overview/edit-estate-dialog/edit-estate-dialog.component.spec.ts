import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEstateDialogComponent } from './edit-estate-dialog.component';

describe('EditEstateDialogComponent', () => {
  let component: EditEstateDialogComponent;
  let fixture: ComponentFixture<EditEstateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEstateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEstateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
