import { Component } from '@angular/core';

import { mockProjects } from '../actors/test-object/mock-projects';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  projects = mockProjects;
}
