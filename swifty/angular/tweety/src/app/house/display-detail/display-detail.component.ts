import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { Task } from 'src/app/actors/task';
import { TaskService } from 'src/app/services/task.service';
import { Status } from 'src/app/actors/status';
import { StatusService } from 'src/app/services/status.service';
import { Observable, forkJoin } from 'rxjs';
import { Role } from 'src/app/actors/role';
@Component({
  selector: 'app-display-detail',
  templateUrl: './display-detail.component.html',
  styleUrls: ['./display-detail.component.scss']
})
export class DisplayDetailComponent implements OnChanges {
  @Input() selectedProject: Project = {} as Project;
  userRoles: Status[] = [];
  constructor(private taskService: TaskService, private statusService:StatusService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getProjectstatus();
  }
  getProjectstatus(): void{
    if(this.selectedProject.ProjectID ){
      this.statusService.getStatuses().subscribe(stat =>{
        this.userRoles = stat.filter( s => s.ProjectID == this.selectedProject.ProjectID);
})}
     }
  }

