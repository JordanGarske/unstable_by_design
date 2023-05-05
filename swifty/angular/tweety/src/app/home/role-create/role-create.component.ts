import { Component } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/actors/role';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent {
  role: Role = {} as Role;
  constructor(private roleService: RoleService, private userStorage: CurrentUserStorageService) {}

  createRole():void{
    this.userStorage.getCurrentProject$().pipe(first()).subscribe(x =>{if(x)this.role.ProjectID = x.ProjectID});
    this.role.RoleID=1;
    this.role.Color="#000000";
    this.roleService.addRoles(this.role).pipe(first()).subscribe();
  } 
}
