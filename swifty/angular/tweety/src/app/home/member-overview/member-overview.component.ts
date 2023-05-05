import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/actors/user';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-overview',
  templateUrl: './member-overview.component.html',
  styleUrls: ['./member-overview.component.scss']
})
export class MemberOverviewComponent  implements OnInit{
  id?:number;
  projectEmployee: User[]= [];
  hires: User[] = [];
  constructor(private userService: UserService, private roleService: RoleService, private userStorage: CurrentUserStorageService ){ }
  ngOnInit():void{
    this.userStorage.getCurrentProject$().subscribe(proj =>{
       this.roleService.getRoles().subscribe(roles=> this.id = roles.filter( role => role.ProjectID === proj?.ProjectID
         && role.Name === "employee" )[0].RoleID )}) ;
    this.userService.getUsers().subscribe(users => this.dividUser(users));
    
  }
  dividUser(users: User[]):void{
   this.projectEmployee= [];
    this.hires = [];
      users.forEach(user => {
        if(this.id){

          if(!user.Roles.includes(this.id)){ this.projectEmployee.push(user)}
          else{ this.hires.push(user)}

      }})
    }
  
  selectedUser(user: User):void {
    if(this.id){
     if(!user.Tasks){
        user.Tasks = [];
     }
       user.Tasks.push(this.id); 
      this.userService.updateUser(user).subscribe(x => this.userService.getUsers().subscribe(users => this.dividUser(users) ));
    }
  }
   
}