import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReadOnlyComponent } from './book-read-only.component';

describe('BookReadOnlyComponent', () => {
  let component: BookReadOnlyComponent;
  let fixture: ComponentFixture<BookReadOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReadOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
