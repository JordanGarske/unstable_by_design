import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './loginFolder/login/login.component';
import { CreateComponent } from './loginFolder/create/create.component';
import { HomeComponent } from './home/home.component';
import { HouseComponent } from './house/house.component';
import { CreateActorComponent } from './create-actor/create-actor.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateComponent },
  { path: 'home', component: HouseComponent },
  {path:'create/:ownerName/:ownerID/:createFor', component: CreateActorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
