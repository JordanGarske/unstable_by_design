import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Status } from '../actors/status';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statusesUrl = 'http://localhost:8000/api/statuses/'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusesUrl).pipe(
      catchError(this.handleError<Status[]>('getStatuses', []))
    );
  }

  /** GET status by id. Will 404 if id not found */
  getStatusById(id: number): Observable<Status> {
    const url = `${this.statusesUrl}/${id}`;
    return this.http.get<Status>(url).pipe(
      catchError(this.handleError<Status>(`getStatusById id=${id}`))
    );
  }

  /** PUT: update the status on the server */
  updateStatus(status: Status): Observable<any> {
    return this.http.put(this.statusesUrl, status, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateStatus'))
    );
  }

  /** POST: add a new status to the server */
  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.statusesUrl, status, this.httpOptions).pipe(
      catchError(this.handleError<Status>('addStatus'))
    );
  }

  /** DELETE: delete the status from the server */
  deleteStatus(id: number): Observable<Status> {
    const url = `${this.statusesUrl}/${id}`;

    return this.http.delete<Status>(url, this.httpOptions).pipe(
      catchError(this.handleError<Status>('deleteStatus'))
    );
  }

  /* GET statuses whose name contains search term */
  searchStatuses(term: string): Observable<Status[]> {
    if (!term.trim()) {
      // if not search term, return empty status array.
      return of([]);
    }
    return this.http.get<Status[]>(`${this.statusesUrl}/?Name=${term}`).pipe(
      catchError(this.handleError<Status[]>('searchStatuses', []))
    );
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
