import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookFormComponent } from './add-new-book-form.component';

describe('AddNewBookFormComponent', () => {
  let component: AddNewBookFormComponent;
  let fixture: ComponentFixture<AddNewBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBookFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
