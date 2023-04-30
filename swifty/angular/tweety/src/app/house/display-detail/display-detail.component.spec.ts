import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDetailComponent } from './display-detail.component';

describe('DisplayDetailComponent', () => {
  let component: DisplayDetailComponent;
  let fixture: ComponentFixture<DisplayDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
