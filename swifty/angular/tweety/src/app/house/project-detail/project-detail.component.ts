import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/actors/project';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  userProjects:Project[] = []; 
  constructor(private userservice: UserService, private currentuserstorageservice:CurrentUserStorageService, private router: Router,){}
  
  ngOnInit(): void {
      this.currentuserstorageservice.getCurrentUserProjects().subscribe(projs =>this.userProjects = projs );
      
  }

}
