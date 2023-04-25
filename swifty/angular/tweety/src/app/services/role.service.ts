import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../actors/task';
import { Role } from '../actors/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  djangoURL = 'localhost:8000/api'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getTasks(id:number) :Observable<Role>{
    return this.http.get<Role>(this.setUpTasks(id)).pipe();
  }
  setUpTasks(id:number): string{
    return `${this.djangoURL}/Roles/${id }`;
  }
  deleteUser(id:number): Observable<Role>{
    return this.http.get<Role>(this.setUpTasks(id)).pipe();
  }
  addUser(hero: Role): Observable<Role> {
    return this.http.post<Role>(this.djangoURL, hero, this.httpOptions).pipe(
    );
  }
}