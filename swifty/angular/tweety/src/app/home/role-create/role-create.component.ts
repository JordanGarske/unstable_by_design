import { Component } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/app/actors/role';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent {
  role: Role = {} as Role;
  constructor(private roleService: RoleService) {}

  createRole():void{
    this.roleService.addRoles(this.role);
  } 
}
