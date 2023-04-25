import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../actors/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  djangoURL = 'localhost:8000/api'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getTasks(id:number) :Observable<Task>{
    return this.http.get<Task>(this.setUpTasks(id)).pipe();
  }
  setUpTasks(id:number): string{
    return `${this.djangoURL}/Tasks/${id }`;
  }
  deleteUser(id:number): Observable<Task>{
    return this.http.get<Task>(this.setUpTasks(id)).pipe();
  }
  addUser(hero: Task): Observable<Task> {
    return this.http.post<Task>(this.djangoURL, hero, this.httpOptions).pipe(
    );
  }
}

