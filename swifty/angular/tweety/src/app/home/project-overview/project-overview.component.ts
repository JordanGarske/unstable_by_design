import { Component, OnInit } from '@angular/core';
import { first, tap } from 'rxjs';
import { Project } from 'src/app/actors/project';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
})
export class ProjectOverviewComponent implements OnInit {
  project = {} as Project;
  constructor(
    private projectService: ProjectService,
    private userStorage: CurrentUserStorageService
  ) {}
  ngOnInit(): void {
    this.userStorage
      .getCurrentProject$().pipe(first())
      .subscribe((selected) => {
        if (selected) {
          this.project = selected;
        }
      })
  }
  updateProject(): void {
    this.projectService.updateProject(this.project).pipe(first(), tap(_ => this.userStorage.setProjects$())).subscribe();
  }
}
