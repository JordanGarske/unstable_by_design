import { Component } from '@angular/core';
import { User } from 'src/app/actors/user';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-overview',
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss']
})
export class MemberOverviewComponent {
  id:number = 0 ;
  allUsers: User[]= [];
  constructor(private userService: UserService, private roleService: RoleService, private userStorage: CurrentUserStorageService ){ }
  member():void{
    this.userStorage.getCurrentProject$().subscribe(proj =>{
       this.roleService.getRoles().subscribe(roles=> this.id = roles.filter( role => role.ProjectID === proj?.ProjectID
         && role.Description === "employee" )[0].RoleID )}) ;
    this.userService.getUsers().subscribe(users => this.allUsers = users);
    
  }
  selectedUser(user: User):void {
       user.UserID =  this.id; 
      this.userService.addUser(user).subscribe(x => console.log(x));
  }
   
}