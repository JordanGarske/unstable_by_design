import { Component } from '@angular/core';
import { CurrentUserStorageService } from 'src/app/current-user-storage.service';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.scss']
})
export class ProjectSidebarComponent {
  constructor(private userStorage: CurrentUserStorageService) {}
  clickOverview() {
    this.userStorage.setSelect$(2);
  }
  clickRoles() {
    this.userStorage.setSelect$(4);
  }
  clickMembers() {
    this.userStorage.setSelect$(5);
  }
}
