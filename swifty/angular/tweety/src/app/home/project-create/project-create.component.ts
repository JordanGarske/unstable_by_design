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
    Color: '#e4b3ff',
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
        first(),
        tap((value) => {
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
              Name: 'To Do',
              Description: 'All tasks that need to be done',
              ProjectID: value.ProjectID,
              Tasks: [],
            } as Status)
            .pipe(
              take(1),
              finalize(() =>
                this.statusService
                  .addStatus({
                    StatusID: 1,
                    Name: 'In Progress',
                    Description: 'All tasks that are in-progress',
                    ProjectID: value.ProjectID,
                    Tasks: [],
                  } as Status)
                  .pipe(
                    take(1),
                    finalize(() =>
                      this.statusService
                        .addStatus({
                          StatusID: 1,
                          Name: 'Done',
                          Description: 'All tasks that are complete',
                          ProjectID: value.ProjectID,
                          Tasks: [],
                        } as Status)
                        .pipe(
                          take(1),
                          finalize(() => {
                            this.userStorage.setProjects$();
                            this.userStorage.setSelect$(1);
                          })
                        )
                        .subscribe()
                    )
                  )
                  .subscribe()
              )
            )
            .subscribe();
        }),
        tap((x) => this.userStorage.setCurrentProject$(x))
      )
      .subscribe();
  }
}
