import { Component, OnInit } from '@angular/core';
import { Project } from '../actors/project';
import { CurrentUserStorageService } from '../current-user-storage.service';
import { Task } from '../actors/task';
import { User } from '../actors/user';
import { Role } from '../actors/role';
import { first, map, tap } from 'rxjs';
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
    this.currentUser.setProjects$()
    this.currentUser
      .getCurrentUserProjects()
      .subscribe((x) => {if(x)(this.projects = x)})
    this.currentUser.getSelect$().subscribe((x) => this.select = x);
  }

  clickProject(project: Project) {
    this.currentUser.setCurrentProject$(project);
    this.currentUser.setProjects$();
    this.currentUser.setSelect$(1);
  }
  clickNewProject() {
    this.currentUser.setCurrentProject$(undefined);
    this.currentUser.getSelect$().pipe(
      tap(val => val !== 11?this.currentUser.setSelect$(11):null),
      first()
    ).subscribe()
  }
  delete(proj:Project){
    this.projectService.deleteProject(proj.ProjectID).pipe(first(),tap(_ => this.currentUser.setProjects$())).subscribe();
    
    this.currentUser.setSelect$(0);
  }
}
