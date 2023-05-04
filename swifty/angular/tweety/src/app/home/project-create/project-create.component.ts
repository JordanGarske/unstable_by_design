import { Component } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  newProject: Project = {} as Project;
  constructor(private userStorage: CurrentUserStorageService  ,private projectService: ProjectService ,private userService: UserService) {}

  createProject():void{
    this.projectService.addProject(this.newProject).subscribe(value =>{
        console.log(value);
    });
  } 
}
