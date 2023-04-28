import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/actors/project';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { UserService } from 'src/app/services/user.service';
import {User} from '../actors/user'
@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  user:User;
  constructor(private userservice: UserService, private currentuserstorageservice:CurrentUserStorageService, private router: Router,){
    this.user = {} as User;
  }
  ngOnInit(): void {
   this.user = this.currentuserstorageservice.getUser()
  }
  
}
