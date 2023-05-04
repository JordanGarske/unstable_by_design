import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/actors/user';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string = "";
  username:string  = ""; 
  submit:boolean = false ; 
  users:User[] = [] 
  constructor(private userservice: UserService, private currentuserstorageservice:CurrentUserStorageService, private router: Router,){}
  ngOnInit(): void {
      this.userservice.getUsers().subscribe(items => this.users = items)
       
  }
  checkPassword():void {
      this.users.forEach(item =>{ if(item.Password === this.password &&  item.Username === this.username){
         this.currentuserstorageservice.setUser(item);
         this.currentuserstorageservice.setCurrentUser$(item);
         this.router.navigate(['home']); } })}
  
}
















































// temp(): void {
//   this.users = [
//     {
//       UserID: 1,
//       Username: "john_doe",
//       Password: "password123",
//       Roles: [1, 2],
//       Authored_Tasks: [1, 2],
//       Tasks: [3, 4],
//       Messages: [1, 2, 3]
//     },
//     {
//       UserID: 2,
//       Username: "jane_doe",
//       Password: "password456",
//       Roles: [2],
//       Authored_Tasks: [3],
//       Tasks: [1, 2],
//       Messages: [4, 5, 6]
//     },
//     {
//       UserID: 3,
//       Username: "bob_smith",
//       Password: "password789",
//       Roles: [1],
//       Authored_Tasks: [4, 5],
//       Tasks: [5],
//       Messages: [7, 8, 9]
//     }
//   ];  
// }