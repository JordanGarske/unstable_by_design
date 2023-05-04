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

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
})
export class ProjectCreateComponent {
  newProject: Project = {} as Project;
  user: User = {} as User;
  constructor(
    private userStorage: CurrentUserStorageService,
    private projectService: ProjectService,
    private userService: UserService,
    private roleService: RoleService,
    private statusService: StatusService
  ) {
    this.userStorage.getCurrentUser$().subscribe((x) => {
      if (x) {
        this.user = x;
      }
    });
  }
  //doesn't POST for Derek @5/4/2023
  createProject(): void {
    this.projectService.addProject(this.newProject).subscribe((value) => {
      this.roleService
        .addRoles({
          Name: 'employee',
          Description: 'This is the first role',
          Color: 'green',
          ProjectID: value.ProjectID,
        } as Role)
        .subscribe((role) => {
          this.user.Roles.push(role.RoleID);
          this.userService.updateUser(this.user).subscribe();
        });
      this.statusService.addStatus({
        Name: 'incompleted',
        Description: 'this',
        ProjectID: this.newProject.ProjectID,
      } as Status);
      this.statusService.addStatus({
        Name: 'inprogress',
        Description: 'this',
        ProjectID: this.newProject.ProjectID,
      } as Status);
      this.statusService.addStatus({
        Name: 'done',
        Description: 'this',
        ProjectID: this.newProject.ProjectID,
      } as Status);
    });
  }
}
