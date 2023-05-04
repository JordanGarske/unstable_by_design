import { Component } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.scss']
})
export class StatusCreateComponent {
  status: Status = {} as Status;
  constructor(private statusService: StatusService, private currentUserStorage: CurrentUserStorageService) {}

  createStatus():void{
    this.currentUserStorage.getCurrentProject$().subscribe(x => {if(x)this.status.ProjectID = x.ProjectID})
    this.status.Tasks = []
    this.statusService.addStatus(this.status).subscribe();
  } 
}
