import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { Task } from 'src/app/actors/task';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { TaskService } from 'src/app/services/task.service';
import { Project } from 'src/app/actors/project';
import { StatusService } from 'src/app/services/status.service';
import { first, forkJoin } from 'rxjs';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  selectedStatus: Status = {} as Status;
  task:Task = {} as Task;
  project: Project = {} as Project;
  statusOptions: Status[] = [];
  statuses: Status[] = [];
  constructor(private taskService: TaskService, private statusService: StatusService,private userStroage: CurrentUserStorageService){}
  ngOnInit( ): void {
    this.userStroage.getCurrentTask$().pipe(first()).subscribe(selected => {
      
      if(selected){
        this.task = selected;
        this.userStroage.getProjectStatusID().filter( x => x !=undefined);
        this.userStroage.setCurrentTask$(undefined);
      }});


    this.userStroage.getCurrentProject$().pipe(first()).subscribe(x => {if(x) this.project = x})
    forkJoin(this.project.Statuses.map(x => this.statusService.getStatusById(x))).pipe(first()).subscribe(x => this.statusOptions = x)
    
  }

  updateStatusID(e: any){
    this.task.StatusID = Number.parseInt(e.target.value)
  }

  updateTask():void{
    console.log(this.task)
    this.taskService.updateTask(this.task).pipe(first()).subscribe();
  }
  
}
