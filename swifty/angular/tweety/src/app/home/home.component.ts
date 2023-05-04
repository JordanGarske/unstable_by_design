import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../actors/project';
import { CurrentUserStorageService } from '../current-user-storage.service';
import { Task } from '../actors/task';
import { User } from '../actors/user';
import { Role } from '../actors/role';
import { forkJoin } from 'rxjs';
import { RoleService } from '../services/role.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  user: User = {} as User;
  roles: Role[] = [];
  select: number = 0;

  constructor(
    private currentUser: CurrentUserStorageService,
    private roleService: RoleService,
    private projectService: ProjectService
  ) {}
  ngOnInit(): void {
    this.currentUser
      .getCurrentUserProjects()
      .subscribe((x) => (this.projects = x)).unsubscribe();
    this.currentUser.getSelect$().subscribe((x) => {this.select = x; this.currentUser
      .getCurrentUserProjects()
      .subscribe((x) => (this.projects = x)).unsubscribe();});
  }

  clickProject(project: Project) {
    this.currentUser.setCurrentProject$(project);
    this.currentUser.setSelect$(1);
  }
  clickNewProject() {
    this.currentUser.setCurrentProject$(undefined);
    this.currentUser.setSelect$(11);
  }
  delete(proj:Project){
    this.projectService.deleteProject(proj.ProjectID).subscribe();
  }
}
