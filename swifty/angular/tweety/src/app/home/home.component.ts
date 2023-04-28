import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProjectService } from '../services/project.service';
import { Project } from '../actors/project';
import { CurrentUserStorageService } from '../current-user-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  projects: Project[] = [];
  constructor(private currentUser:CurrentUserStorageService ) {}
}
