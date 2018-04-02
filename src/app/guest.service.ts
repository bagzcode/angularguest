import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Guest } from './guest';
import { GUESTS } from './mock-guests';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class GuestService {

  private guestsUrl = 'https://api.kerthyayana.me/api/signatures';  // URL to web api
  
  
  constructor(
  	private http: HttpClient
  ) { }


  /** GET guests from the server */
  getGuests(): Observable<any> {
  	return this.http.get<Guest[]>(this.guestsUrl)
      .pipe(
        //tap(Guest => this.log('fetched guests')),
        catchError(this.handleError('getGuests', []))
      );
     
  }

  /** GET guest by id. Return `undefined` when id not found */
  getGuestNo404<Data>(id: number): Observable<Guest> {
    const url = `${this.guestsUrl}/?id=${id}`;
    return this.http.get<Guest[]>(url)
      .pipe(
        map(guests => guests[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} guest id=${id}`);
        }),
        catchError(this.handleError<Guest>(`getGuest id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getGuest(id: number): Observable<any> {
    const url = this.guestsUrl+'/'+id;
    //console.log(url);
    return this.http.get<Guest>(url).pipe(
      //tap(_ => this.log(`fetched guest id=${id}`)),
      catchError(this.handleError<Guest>(`getGuest id=${id}`))
    );
  }

  //////// Save methods //////////
 
  /** POST: add a new guest to the server */
  addGuest (guest: Guest): Observable<Guest> {
  	console.log(guest);
    return this.http.post<Guest>(this.guestsUrl, guest, httpOptions).pipe(
      //tap((guest: Guest) => this.log('added guest w/ id=${guest.id}'')),
      catchError(this.handleError<Guest>('addGuest'))
    );
  }

  /** DELETE: delete the guest from the server */
  deleteGuest (guest: Guest | number): Observable<Guest> {
    const id = typeof guest === 'number' ? guest : guest.id;
    const url = this.guestsUrl+'/'+id;
 
    return this.http.delete<Guest>(url, httpOptions).pipe(
      //tap(_ => this.log(`deleted guest id=${id}`)),
      catchError(this.handleError<Guest>('deleteGuest'))
    );
  }
 
  /** PUT: update the guest on the server */
  updateGuest (guest: Guest): Observable<any> {
    return this.http.put(this.guestsUrl+'/'+guest.id+'/report/', guest, httpOptions).pipe(
      //tap(_ => this.log(`updated guest id=${guest.id}`)),
      catchError(this.handleError<any>('updateGuest'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      //console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
