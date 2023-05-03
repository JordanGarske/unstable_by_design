import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEditComponent } from './status-edit.component';

describe('StatusEditComponent', () => {
  let component: StatusEditComponent;
  let fixture: ComponentFixture<StatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
