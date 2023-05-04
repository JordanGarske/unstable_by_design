import { Component } from '@angular/core';
import { Project } from 'src/app/actors/project';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent {
  projectSelected: Project = {
    ProjectID: 1,
    Name: 'test',
    Description: 'temp des',
    Color: '',
    Roles: [],
    Channels: [],
    Statuses: [],
  }; //get from settings
  
  clickSave() {
    console.log('clickSave');
  }
}
