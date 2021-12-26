import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreReadOnlyComponent } from './store-read-only.component';

describe('StoreReadOnlyComponent', () => {
  let component: StoreReadOnlyComponent;
  let fixture: ComponentFixture<StoreReadOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreReadOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
