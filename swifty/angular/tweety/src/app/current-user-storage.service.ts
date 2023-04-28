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
      const filteredRoles = x.filter(b => b.Users.includes(loginUser.UserID));
      this.roles = filteredRoles;
    });
  }
  getUser():User{
    return this.user
  }
  getCurrentUserProjects():Observable<Project[]> {
    return this.projectservice.getProjects().pipe(
      map(projects => {
        
        return projects.filter(project => {
          for (let i = 0; i < this.roles.length; i++) {
               if( this.roles[i].ProjectID != project.ProjectID){
                return false
               }

          }
          return true
          
        });
      
      })
    );
  }
}

