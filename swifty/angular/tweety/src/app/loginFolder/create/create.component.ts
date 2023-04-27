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

  user: User = { UserID: 0, Username: '', Password: '', Roles: [], Authored_Tasks: [], Tasks: [], Messages: [] };
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
    if (this.user.Password !== '' && this.user.Username !== '' && this.user.Password === this.confirm_password) {
      this.userService.addUser(this.user).subscribe(user => {
        // handle success or error here
      });
    }
  }

  onSubmit(): void {
    this.create_user();
  }

}
