import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProjectService } from '../services/project.service';
import { Project } from '../actors/project';
import { CurrentUserStorageService } from '../current-user-storage.service';
import { TaskDetailComponent } from './taskboard/task-detail/task-detail.component';
import { TaskboardComponent } from './taskboard/taskboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(TaskboardComponent) childComponent?: TaskboardComponent;
  projects: Project[] = [];
  constructor(private currentUser: CurrentUserStorageService) {}
  ngOnInit(): void {
    this.currentUser.getCurrentUserProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }
  select: number = 0; // this can be any : 1:taskboard / 2:overview / 3:task-view / 4:
  clickProject(project: Project) {
    this.currentUser.setCurrentProject$(project)
    // this.childComponent?.getProjectstatus();
    this.select = 1;
    
  }
  clickNewProject() {}
}
