import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit {
  project = {} as Project;
  constructor(private projectService: ProjectService, private userStorage: CurrentUserStorageService){}
  ngOnInit( ): void {
    this.userStorage.getCurrentProject$().subscribe(selected => {
      if(selected){
        this.project = selected;
        this.userStorage.setCurrentProject$(undefined);
      }}).unsubscribe();
  }
  updateProject():void{
    this.projectService.updateProject(this.project).subscribe();
  }
} 