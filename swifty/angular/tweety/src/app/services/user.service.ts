import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../actors/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  djangoURL = 'localhost:8000/api'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getUsers(id:number) :Observable<User>{
    return this.http.get<User>(this.setUpUsers(id)).pipe();
  }
  setUpUsers(id:number): string{
    return `${this.djangoURL}/Users/${id }`;
  }
  deleteUser(id:number): Observable<User>{
    return this.http.delete<User>(this.setUpUsers(id)).pipe();
  }
  addUser(hero: User): Observable<User> {
    return this.http.post<User>(this.djangoURL, hero, this.httpOptions).pipe(
    );
  }
}
