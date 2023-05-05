import { Component, OnInit } from '@angular/core';
import { Project } from '../actors/project';
import { CurrentUserStorageService } from '../current-user-storage.service';
import { Task } from '../actors/task';
import { User } from '../actors/user';
import { Role } from '../actors/role';
import { finalize, first, map, take, tap } from 'rxjs';
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

  isDark(project: Project){
    return Number.parseInt(project.Color.charAt(1), 16) <= 7 && Number.parseInt(project.Color.charAt(3), 16) <= 7 && Number.parseInt(project.Color.charAt(5),16) <= 7
  }

  clickProject(project: Project) {
    this.currentUser.setCurrentProject$(project);
    this.currentUser.setProjects$()
    this.currentUser.setSelect$(1);
  }
  clickNewProject() {
    this.currentUser.getCurrentProject$().pipe(
      tap(val => val?this.currentUser.setCurrentProject$(undefined):null),
      first()
    );
    this.currentUser.getSelect$().pipe(
      tap(val => val !== 11?this.currentUser.setSelect$(11):null),
      first()
    ).subscribe()
  }
  delete(proj:Project){
    this.projectService.deleteProject(proj.ProjectID).pipe(take(1),finalize(() => this.currentUser.setProjects$())).subscribe();
    this.currentUser.setSelect$(0);
  }
}
