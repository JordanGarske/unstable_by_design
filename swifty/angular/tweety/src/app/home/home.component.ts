import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProjectService } from '../services/project.service';
import { Project } from '../actors/project';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projServ: ProjectService) {}
  ngOnInit() {
    this.projServ
      .getProjects()
      .subscribe((projects) => (this.projects = projects));
  }
}
