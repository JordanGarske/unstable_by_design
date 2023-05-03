import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './loginFolder/login/login.component';
import { CreateComponent } from './loginFolder/create/create.component';
import { TaskboardComponent } from './home/taskboard/taskboard.component';
import { TaskViewComponent } from './home/task-view/task-view.component';
import { ProjectOverviewComponent } from './home/project-overview/project-overview.component';
import { FormsModule } from '@angular/forms';
import { HouseComponent } from './house/house.component';
import { ProjectDetailComponent } from './house/project-detail/project-detail.component';
import { DisplayDetailComponent } from './house/display-detail/display-detail.component';
import { TicketDisplayComponent } from './house/display-detail/ticket-display/ticket-display.component';
import { CreateActorComponent } from './create-actor/create-actor.component';
import { TaskDetailComponent } from './home/taskboard/task-detail/task-detail.component';
import { TaskEditComponent } from './home/task-edit/task-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    TaskboardComponent,
    TaskViewComponent,
    ProjectOverviewComponent,
    HouseComponent,
    ProjectDetailComponent,
    DisplayDetailComponent,
    TicketDisplayComponent,
    CreateActorComponent,
    TaskDetailComponent,
    TaskEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
