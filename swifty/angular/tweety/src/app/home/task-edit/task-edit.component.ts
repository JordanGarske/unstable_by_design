import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { Task } from 'src/app/actors/task';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/actors/project';
import { ProjectService } from 'src/app/services/project.service';
import { StatusService } from 'src/app/services/status.service';
import { PrivacyLevel } from 'discord.js';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  task:Task = {} as Task;
  project: Project = {} as Project;
  statusOptions: Status[] = [];
  statuses: Status[] = [];
  constructor(private taskService: TaskService, private statusService: StatusService,private userStroage: CurrentUserStorageService){}
  ngOnInit( ): void {
    this.userStroage.getCurrentTask$().subscribe(selected => {
      
      if(selected){
        console.log(selected.AuthorID);
      this.task = selected;
      this.userStroage.getProjectStatusID().filter( x => x !=undefined);
      this.userStroage.setCurrentTask$(undefined);
      }}).unsubscribe();
    this.userStroage.getCurrentProject$().subscribe(x => {if(x) this.project = x})
    console.log(this.project)
    this.statusService.getStatuses().subscribe(x => {
      this.statusOptions = x;
      this.statusOptions = this.statusOptions.filter(x => x.ProjectID === this.project.ProjectID)
    })
    console.log(this.statuses)
    
  }
  updateTask():void{
    this.taskService.updateTask(this.task);
    
  }
  
}
