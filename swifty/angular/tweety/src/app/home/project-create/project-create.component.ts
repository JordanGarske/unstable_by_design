import { Component } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  project: Project = {} as Project;
  constructor(private projectService: ProjectService) {}

  createProject():void{
    // create default statuses(you know what they are) and default roles (everyone, admin) for new project
    // make current user admin (role that is created)
    this.projectService.addProject(this.project).subscribe();
  } 
}
