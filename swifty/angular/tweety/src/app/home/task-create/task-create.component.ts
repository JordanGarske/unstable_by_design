import { Component } from '@angular/core';
import { first } from 'rxjs';
import { Task } from 'src/app/actors/task';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss'],
})
export class TaskCreateComponent {
  task: Task = {} as Task;
  success: boolean = false;
  constructor(
    private taskService: TaskService,
    private currentUserStorage: CurrentUserStorageService
  ) {}

  createTask(): void {
    this.currentUserStorage.getCurrentUser$().pipe(first()).subscribe((x) => {
      if (x) this.task.AuthorID = x.UserID;
    });
    this.task.Collaborators = [];
    this.currentUserStorage.getCurrentStatus$().pipe(first()).subscribe((x) => {
      console.log(x);
      if (x) this.task.StatusID = x.StatusID;
    });
    this.taskService.addTask(this.task).pipe(first()).subscribe();
    this.success = true;
  }
}
