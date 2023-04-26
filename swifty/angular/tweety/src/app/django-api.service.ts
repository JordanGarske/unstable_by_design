import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './actors/project';
import { User } from './actors/user';

@Injectable({
  providedIn: 'root'
})
export class DjangoApiService {
   djangoURL = 'localhost:8000/api'

   constructor(private http: HttpClient) { }
  getUserProject(projID:number) :Observable<Project>{
    return this.http.get<Project>(this.setUpProject(projID)).pipe();
  }
  getUserUsers(usersID:number) :Observable<User>{
    return this.http.get<User>(this.setUpUsers(usersID)).pipe();
  }
  setUpProject(id:number): string{
    return `${this.djangoURL}/Projects/${id }`;
  }
  setUpUsers(id:number): string{
    return `${this.djangoURL}/Users/${id }`;
  }
  setUpTickets(id:number): string{
    return `${this.djangoURL}/Tickets/${id }`;
  }
}
