import { Component } from '@angular/core';
import { Task } from 'src/app/actors/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  task: Task = {} as Task;
  constructor(private taskService: TaskService) {}

  createTask():void{
    this.taskService.addTask(this.task).subscribe();
  } 
}
