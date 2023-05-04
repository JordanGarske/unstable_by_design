import { Component } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-create',
  templateUrl: './status-create.component.html',
  styleUrls: ['./status-create.component.scss']
})
export class StatusCreateComponent {
  status: Status = {} as Status;
  constructor(private statusService: StatusService) {}

  createStatus():void{
    this.statusService.addStatus(this.status);
  } 
}
