import { Injectable } from '@angular/core';
import { MessageService } from './services/message.service';
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { RoleService } from './services/role.service';
import { StatusService } from './services/status.service';
import { UserService } from './services/user.service';
import { User } from './actors/user';
import { Project } from './actors/project';
import { Observable, map, mergeMap } from 'rxjs';
import { Role } from './actors/role';
import { Task } from './actors/task';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserStorageService {
  private currentUser: User = {} as User;
  private roles: Role[] = [];
  //currrents
  private currentProject: Project = {} as Project;
  private currentTask: Task = {} as Task;

  constructor(
    private userservice: UserService,
    private projectservice: ProjectService,
    private roleservice: RoleService
  ) {}

  setUser(loginUser: User): void {
    this.currentUser = loginUser;
    this.roleservice.getRoles().subscribe((x) => {
      let uniqueData = x
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .filter((g) => this.currentUser.Roles.includes(g.RoleID));
      this.roles = uniqueData;
    });
  }
  getUser(): User {
    return this.currentUser;
  }
  getrole(): Role[] {
    return this.roles;
  }
  getCurrentUserProjects(): Observable<Project[]> {
    return this.projectservice.getProjects().pipe(
      map((projects) => {
        return projects.filter((item) => {
          for (let index = 0; index < this.roles.length; index++) {
            if (this.roles[index].ProjectID === item.ProjectID) {
              return true;
            }
          }
          return false;
        });
      })
    );
  }
}
