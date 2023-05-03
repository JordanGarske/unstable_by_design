import { Component, OnChanges } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { Role } from 'src/app/actors/role';
import { Status } from 'src/app/actors/status';
import { Task } from 'src/app/actors/task';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { StatusService } from 'src/app/services/status.service';
@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
})
export class TaskboardComponent {
  completedTasks: number = 0;
  inProgressTasks: number =0;
  notStartedTasks:number =0;
  projectSelected = 'Temp Project A'; //import from settings

   constructor(private userStroage: CurrentUserStorageService, private statusService: StatusService){}
  addTask() {}
  clickTask(task: Task) {}
  getProjectstatus(): void{
    let temp: Status[];
    if(this.userStroage.getCurrentProject() ){
      this.statusService.getStatuses().subscribe(stat =>{    
        temp  = stat.filter( s => s.ProjectID == this.userStroage.getCurrentProject().ProjectID);
        console.log(stat);
        
        if(temp.length === 3 ){
            this.completedTasks = temp[2].StatusID;
        }
        this.inProgressTasks = temp[1].StatusID;
        this.notStartedTasks = temp[1].StatusID;
        
        
})

}

     }

     
  
}
