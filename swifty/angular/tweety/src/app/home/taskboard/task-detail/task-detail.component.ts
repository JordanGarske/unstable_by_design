import { Component, Input, OnChanges } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { Task } from 'src/app/actors/task';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnChanges {
  @Input() certainTask?: number;
  userTasks?:Task[]; 
  constructor(private taskService: TaskService){}
  ngOnChanges(): void {
    console.log(this.certainTask);
    
    if(this.certainTask){
        this.taskService.getTasks().subscribe(items => {
           this.userTasks = items.filter(item => item.StatusID === this.certainTask );
        })
    }
  }
   
}
