import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../actors/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl = 'http://localhost:8000/api/users/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  /** GET User by id. Will 404 if id not found */
  getUserById(id: number): Observable<User> {
    const url = `${this.usersUrl}${id}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUserById id=${id}`)));
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http
      .put(this.usersUrl+user.UserID+'/', user, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateUser')));
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('addUser')));
  }

  /** DELETE: delete the user from the server */
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}${id}`;

    return this.http
      .delete<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError<User>('deleteUser')));
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http
      .get<User[]>(`${this.usersUrl}?Username=${term}`)
      .pipe(catchError(this.handleError<User[]>('searchUsers', [])));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
