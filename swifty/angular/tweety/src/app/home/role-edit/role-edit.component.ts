import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { first, map, of, switchMap, tap } from 'rxjs';
import { Role } from 'src/app/actors/role';
import { User } from 'src/app/actors/user';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {
  role: Role = {} as Role;
  users: User[] = [];
  selectedUsers: User[] = [];
  constructor(
    private roleService: RoleService, 
    private userService: UserService,
    private userStorage: CurrentUserStorageService){}
  ngOnInit( ): void {
    this.userStorage.getCurrentRole$().pipe(
      tap(role => {
        if(!role)
          return
        this.userService.getUsers().pipe(
          map(users =>
            users.filter(user=> user.Roles.includes(role.RoleID))
          ),
          first(),
        ).subscribe(x => {this.selectedUsers = x; console.log(x)}) 
      }),
      first()
    ).subscribe(selected => {
      if(selected){
        this.role = selected;
    }});
    
    

    this.userStorage.getCurrentProject$().pipe(
      switchMap(project => {
        if(!project)
          return of([])
        return this.roleService.getRoles().pipe(
          map(roles => roles.filter(role => role.ProjectID === project.ProjectID)),
          switchMap(roles => this.userService.getUsers().pipe(
            map(users => users.filter(user => user.Roles.some(userRole => roles.some(role => role.RoleID === userRole)))),
            first()
          )),
          first()
        );
      }),
      first()
    ).subscribe(users => this.users = users);
  }

  updateRole():void{
    this.userStorage.getCurrentProject$().subscribe(x => {if(x) this.role.ProjectID = x.ProjectID});
    this.selectedUsers.forEach(user => {user.Roles.push(this.role.RoleID); this.userService.updateUser(user).pipe(first()).subscribe()});
    this.roleService.updateRole(this.role).subscribe();
  } 
}
