import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/actors/project';
import { Role } from 'src/app/actors/role';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  userProjects:Project[] = []; 
  userrole:Role[] = []; 
  switch:string = "project"
  @Output() clickProject = new EventEmitter<Project>();
  constructor(private userservice: UserService, private currentuserstorageservice:CurrentUserStorageService, private router: Router,){}
  
  ngOnInit(): void {
      this.currentuserstorageservice.getCurrentUserProjects().subscribe(projs =>{this.userProjects = projs;
        this.userrole = this.currentuserstorageservice.getrole();
      });
  }
  switchItem(item:string): void {
     this.switch = item ; 
  }
  selectedProject(proj:Project):void{
    this.clickProject.emit(proj);
  }
}
