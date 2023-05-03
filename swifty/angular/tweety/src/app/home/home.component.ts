import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../actors/project';
import { CurrentUserStorageService } from '../current-user-storage.service';
import { Task } from '../actors/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  select: number = 0; // this can be any : 1:taskboard / 2:overview / 3:task-edit / 4:
  constructor(private currentUser: CurrentUserStorageService) {}
  ngOnInit(): void {
    this.currentUser.getCurrentUserProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.currentUser.getSelect$().subscribe(x => this.select = x)
  }
  
  clickProject(project: Project) {
    this.currentUser.setCurrentProject$(project)
    
    // this.childComponent?.getProjectstatus();
    this.currentUser.setSelect$(1)
    
  }
  clickNewProject() {}
}
