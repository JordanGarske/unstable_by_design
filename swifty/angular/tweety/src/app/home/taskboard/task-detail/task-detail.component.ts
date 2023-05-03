import { Component, Input, OnChanges } from '@angular/core';
import { Task } from 'src/app/actors/task';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnChanges {
  @Input() certainTask?: number;
  userTasks?:Task[]; 
  constructor(private taskService: TaskService, private userStroage: CurrentUserStorageService){}
  ngOnChanges(): void {
    
    if(this.certainTask){
        this.taskService.getTasks().subscribe(items => {
           this.userTasks = items.filter(item => item.StatusID === this.certainTask );
        })
    }
  }
  selectedTask(item:Task): void{
      this.userStroage.setCurrentTask$(item);
  }
}
