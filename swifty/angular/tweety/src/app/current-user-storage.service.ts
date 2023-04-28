import { Injectable } from '@angular/core';
import {MessageService} from './services/message.service';
import {ProjectService} from './services/project.service';
import {TaskService} from './services/task.service';
import {RoleService} from './services/role.service';
import {StatusService} from './services/status.service';
import {UserService} from './services/user.service';
import {User} from './actors/user'
import {Project} from './actors/project'
import { Observable, map, mergeMap } from 'rxjs';
import { Role } from './actors/role';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserStorageService {
  private user: User; 
  private roles:Role[] = [];
  constructor(private userservice: UserService,  private projectservice: ProjectService, private roleservice: RoleService ) {
     this.user = {UserID: 0,  Username: "",   Password:"", Roles:[], Authored_Tasks:[], Tasks:[],Messages:[] };
   }

   setUser(loginUser: User): void {
    this.user = loginUser;
    this.roleservice.getRoles().subscribe(x => {
      let uniqueData = x.filter((value, index, self) => {
        return self.indexOf(value) === index;
      }).filter(g => this.user.Roles.includes(g.RoleID) );
      this.roles = uniqueData
    });
  }
  getUser():User{
    return this.user
  }
  getrole():Role[]{
    return this.roles
  }
  getCurrentUserProjects(): Observable<Project[]> {
    return this.projectservice.getProjects().pipe(
      map(projects => {
        return projects.filter(item => {
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

