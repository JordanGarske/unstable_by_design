import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/actors/status';
import { StatusService } from 'src/app/services/status.service';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.scss'],
})
export class StatusEditComponent implements OnInit {
  status: Status = {} as Status;
  success: boolean = false;
  constructor(
    private statusService: StatusService,
    private userStorage: CurrentUserStorageService
  ) {}
  ngOnInit(): void {
    this.userStorage
      .getCurrentStatus$()
      .pipe(first())
      .subscribe((selected) => {
        if (selected) {
          this.status = selected;
        }
      });
  }
  updateStatus(): void {
    this.userStorage
      .getCurrentProject$()
      .pipe(first())
      .subscribe((x) => {
        if (x) this.status.ProjectID = x.ProjectID;
      });
    this.statusService.updateStatus(this.status).pipe(first()).subscribe();
    this.success = true;
  }
}
