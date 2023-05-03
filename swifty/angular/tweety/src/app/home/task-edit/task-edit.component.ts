import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { Task } from 'src/app/actors/task';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  task:Task = {} as Task;
  statusOptions: Status[] = [];
  constructor(private taskService: TaskService, private userStroage: CurrentUserStorageService){}
  ngOnInit( ): void {
    this.userStroage.getCurrentTask$().subscribe(selected => {
      this.task = selected
      this.statusOptions = this.userStroage.getProjectStatusID().filter( x => x !=undefined)
    });
  }
  updateTask():void{
    this.taskService.updateTask(this.task);
  }
  
}
