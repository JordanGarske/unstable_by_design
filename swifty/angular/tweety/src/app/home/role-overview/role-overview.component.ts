import { Component, OnInit } from '@angular/core';
import { first, map, tap } from 'rxjs';
import { Project } from 'src/app/actors/project';
import { Role } from 'src/app/actors/role';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-overview',
  templateUrl: './role-overview.component.html',
  styleUrls: ['./role-overview.component.scss']
})
export class RoleOverviewComponent implements OnInit {
  // Need to list roles out for selection here,
  // detail component mey be helpful
  roles: Role[] = [];
  project: Project = {} as Project;
  constructor(
    private roleService: RoleService, 
    private userStorage: CurrentUserStorageService
  ) {}

  ngOnInit(): void {
      this.pullData()
  }

  clickSelectRole(role: Role){
    this.userStorage.setCurrentRole$(role);
    this.userStorage.setSelect$(7);
  }
  
  clickDeleteRole(role: Role){
    this.roleService.deleteRoles(role.RoleID).pipe(tap(_ => this.pullData()),first()).subscribe()
  }
  
  clickAddRole(){
    this.userStorage.setCurrentRole$(undefined);
    this.userStorage.setSelect$(8);
  }

  private pullData(){
    this.userStorage.getCurrentProject$().pipe(
      tap(
        project => { if(project)
          this.roleService.getRoles().pipe(
            map(roles => 
              roles.filter(role=> 
                role.ProjectID === project.ProjectID)
            ),
            first()
          ).subscribe(x=> {if(x) this.roles = x})
        }
      ),
      first()
    ).subscribe(x => {if(x) this.project = x})
  }
}
