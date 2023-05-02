import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../actors/task';
import { RoleService } from '../services/role.service';
import { StatusService } from '../services/status.service';
import { Status } from '../actors/status';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.scss']
})
export class CreateActorComponent implements OnInit {
  owner?:String; 
  createFor?:String
  task:Task= {} as Task;
  statuses?: Status[];
   constructor(private route: ActivatedRoute,private statusService: StatusService ){}
   ngOnInit(): void {
    this.owner = String(this.route.snapshot.paramMap.get('ownerName'));
    const id =  Number(this.route.snapshot.paramMap.get('ownerID'));
    this.createFor =  String(this.route.snapshot.paramMap.get('createFor'));
    this.statusService.getStatuses().subscribe(state => this.statuses = state.filter(item => item.ProjectID === id ));
  }
  createTask(): void {
    
  }
}