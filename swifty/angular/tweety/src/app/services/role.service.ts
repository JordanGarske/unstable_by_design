import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../actors/role';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  rolesUrl = 'http://localhost:8000/api/roles/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  getRoles(): Observable<Role[]> {
    return this.http
      .get<Role[]>(this.rolesUrl)
      .pipe(catchError(this.handleError<Role[]>('getRoles', [])));
  }

  /** GET role by id. Will 404 if id not found */
  getRoleById(id: number): Observable<Role> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http
      .get<Role>(url)
      .pipe(catchError(this.handleError<Role>(`getRoleById id=${id}`)));
  }

  /** PUT: update the role on the server */
  updateRole(role: Role): Observable<any> {
    return this.http
      .put(this.rolesUrl, role, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateRole')));
  }

  /** POST: add a new role to the server */
  addRoles(role: Role): Observable<Role> {
    return this.http
      .post<Role>(this.rolesUrl, role, this.httpOptions)
      .pipe(catchError(this.handleError<Role>('addRole')));
  }

  /** DELETE: delete the role from the server */
  deleteRoles(id: number): Observable<Role> {
    const url = `${this.rolesUrl}/${id}`;

    return this.http
      .delete<Role>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Role>('deleteRole')));
  }

  /* GET roles whose name contains search term */
  searchRoles(term: string): Observable<Role[]> {
    if (!term.trim()) {
      // if not search term, return empty role array.
      return of([]);
    }
    return this.http
      .get<Role[]>(`${this.rolesUrl}/?Name=${term}`)
      .pipe(catchError(this.handleError<Role[]>('searchRoles', [])));
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
