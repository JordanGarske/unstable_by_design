import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/actors/role';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {
  role: Role = {} as Role;
  constructor(private roleService: RoleService, private userStorage: CurrentUserStorageService){}
  ngOnInit( ): void {
    this.userStorage.getCurrentRole$().subscribe(selected => {
      if(selected){
        this.role = selected;
        this.userStorage.setCurrentRole$(undefined);
      }}).unsubscribe();
  }
  updateRole():void{
    this.userStorage.getCurrentProject$().subscribe(x => {if(x) this.role.ProjectID = x.ProjectID})
    // Implement the ability to add users
    this.roleService.updateRole(this.role);
  } 
}
