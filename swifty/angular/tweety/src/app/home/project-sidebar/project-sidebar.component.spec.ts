import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSidebarComponent } from './project-sidebar.component';

describe('ProjectSidebarComponent', () => {
  let component: ProjectSidebarComponent;
  let fixture: ComponentFixture<ProjectSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
