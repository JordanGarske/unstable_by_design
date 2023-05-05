import { Component } from '@angular/core';
import { Project } from 'src/app/actors/project';
import { User } from 'src/app/actors/user';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { ProjectService } from 'src/app/services/project.service';
import { RoleService } from 'src/app/services/role.service';
import { StatusService } from 'src/app/services/status.service';
import { UserService } from 'src/app/services/user.service';
import { Status } from 'src/app/actors/status';
import { Role } from 'src/app/actors/role';
import { finalize, first, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent {
  newProject: Project = {
    Name: 'ProjectName',
    ProjectID: 4,
    Description: 'This is the Project Description',
    Color: 'black',
    Roles: [],
    Statuses: [],
  };

  user: User = {} as User;
  constructor(
    private userStorage: CurrentUserStorageService,
    private projectService: ProjectService,
    private userService: UserService,
    private roleService: RoleService,
    private statusService: StatusService
  ) {
    this.userStorage
      .getCurrentUser$()
      .pipe(
        tap((x) => {
          if (x) {
            this.user = x;
          }
        }),
        first()
      )
      .subscribe();
  }

  createProject(): void {
    this.projectService
      .addProject(this.newProject)
      .pipe(
        take(1),
        finalize(() => {
          this.userStorage.setProjects$();
          this.userStorage.setSelect$(1);
        }),
        map((value) => {
          this.roleService
            .addRoles({
              Name: 'employee',
              Description: 'This is the first role',
              Color: 'green',
              ProjectID: value.ProjectID,
            } as Role)
            .pipe(
              map((role) => {
                this.user.Roles.push(role.RoleID);
                this.userService
                  .updateUser(this.user)
                  .pipe(first())
                  .subscribe();
              }),
              first()
            )
            .subscribe();

          this.statusService
            .addStatus({
              StatusID: 1,
              Name: 'incomplete',
              Description: 'this',
              ProjectID: value.ProjectID,
              Tasks: [],
            } as Status)
            .pipe(first())
            .subscribe();
          this.statusService
            .addStatus({
              StatusID: 1,
              Name: 'inprogress',
              Description: 'this',
              ProjectID: value.ProjectID,
              Tasks: [],
            } as Status)
            .pipe(first())
            .subscribe();
          this.statusService
            .addStatus({
              StatusID: 1,
              Name: 'done',
              Description: 'this',
              ProjectID: value.ProjectID,
              Tasks: [],
            } as Status)
            .pipe(first())
            .subscribe();
          this.userStorage.setCurrentProject$(value);
        })
      )
      .subscribe();
  }
}
