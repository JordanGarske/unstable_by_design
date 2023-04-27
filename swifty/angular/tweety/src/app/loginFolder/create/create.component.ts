import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CurrentUserStorageService } from '../../current-user-storage.service';
import { User } from 'src/app/actors/user';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  user: User = { UserID: 9, Username: '', Password: '', Roles: [], Authored_Tasks: [], Tasks: [], Messages: [] };
  confirm_password: string = '';
  action = 'enter data';
   display= "cool"
  constructor(
    private userService: UserService,
    private currentUserStorageService: CurrentUserStorageService,
    private location: Location,
  ) {}

  goBack(): void {
    this.location.back();
  }

  create_user(): void {

      let Password = this.user.Password
      let Username = this.user.Username
      this.userService.addUser({Password, Username} as User).subscribe(user => {
           this.goBack();
      });
  }



}
