import { Component, Input } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { Task } from 'src/app/actors/task';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-ticket-display',
  templateUrl: './ticket-display.component.html',
  styleUrls: ['./ticket-display.component.scss']
})
export class TicketDisplayComponent {
  @Input() certainTask?: Status;
  userTasks?:Task[]; 
  constructor(private taskService: TaskService){}
  ngOnChanges(): void {
    if(this.certainTask){
        this.taskService.getTasks().subscribe(items => {
           this.userTasks = items.filter(item => item.StatusID === this.certainTask?.StatusID );
        })
    }
  }
   

}