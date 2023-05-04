import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../actors/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsUrl = 'http://localhost:8000/api/projects/';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(this.projectsUrl)
      .pipe(catchError(this.handleError<Project[]>('getProjects', [])));
  }

  /** GET Project by id. Will 404 if id not found */
  getProjectById(id: number): Observable<Project> {
    const url = `${this.projectsUrl}${id}`;
    return this.http
      .get<Project>(url)
      .pipe(catchError(this.handleError<Project>(`getProjectById id=${id}`)));
  }

  /** PUT: update the project on the server */
  updateProject(project: Project): Observable<any> {
    return this.http
      .put(this.projectsUrl, project, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateProject')));
  }

  /** POST: add a new project to the server */
  addProject(project: Project): Observable<Project> {
    return this.http
      .post<Project>(this.projectsUrl, project, this.httpOptions)
      .pipe(catchError(this.handleError<Project>('addProject')));
  }

  /** DELETE: delete the project from the server */
  deleteProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}${id}`;

    return this.http
      .delete<Project>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Project>('deleteProject')));
  }

  /* GET projects whose name contains search term */
  searchProjects(term: string): Observable<Project[]> {
    if (!term.trim()) {
      // if not search term, return empty role array.
      return of([]);
    }
    return this.http
      .get<Project[]>(`${this.projectsUrl}?Name=${term}`)
      .pipe(catchError(this.handleError<Project[]>('searchProjects', [])));
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
