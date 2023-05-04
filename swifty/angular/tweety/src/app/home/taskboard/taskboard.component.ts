import { Component, OnChanges, OnInit } from '@angular/core';
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
export class TaskboardComponent implements OnInit {
  project: Project = {} as Project
  statuses: Status[] = [];
  //import from settings
  constructor(
    private userStroage: CurrentUserStorageService,
    private statusService: StatusService
  ) {}
  ngOnInit(): void {
    this.userStroage.getCurrentProject$().subscribe((x) => {
      if (x) {
        this.project = x;
        this.statusService.getStatuses().subscribe((stat) => {
          let temp = stat.filter((s) => s.ProjectID === x.ProjectID);
          this.statuses = temp;
          // this.userStroage.getProjectStatusID().push(temp[0], temp[1], temp[1]);
          this.userStroage.getCurrentTask$().subscribe((excute) => {
            if (excute) this.userStroage.setSelect$(3);
          });
        });
      }
    });
  }
  addTask(status: Status) {
    this.userStroage.setCurrentStatus$(status)
    this.userStroage.setSelect$(10);
  }
  clickTask(task: Task) {}
  // this needs to be more dynamic so more statuses can be added
  getProjectstatus(proj: Project): void {
    let temp: Status[];
    if (this.userStroage.getCurrentProject()) {
      this.statusService.getStatuses().subscribe((stat) => {
        temp = stat.filter((s) => s.ProjectID === proj.ProjectID);
        this.statuses = temp;
        // this.userStroage.getProjectStatusID().push(temp[0], temp[1], temp[1]);
        this.userStroage.getCurrentTask$().subscribe((excute) => {
          if (excute) this.userStroage.setSelect$(3);
        });
      });
    }
  }
  clickSettings() {
    this.userStroage.setSelect$(2);
  }
  clickAddStatus() {
    this.userStroage.setSelect$(9);
  }
}
