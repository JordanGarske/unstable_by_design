import { Component } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { Task } from 'src/app/actors/task';
@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss'],
})
export class TaskboardComponent {
  completedTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  notStartedTasks: Task[] = [];
  projectSelected = 'Temp Project A'; //import from settings
  addTask() {}
  clickTask(task: Task) {}
}
