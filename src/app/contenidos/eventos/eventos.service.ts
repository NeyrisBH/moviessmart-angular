import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'https://gateway.marvel.com/v1/public/events';
  private apiKey = '776d27f4503f9642f702889fb1cb6be0';
  private ts = '1';
  private hash = '1d6f981361d6726e532b2ba8524bb31c';

  constructor(private http: HttpClient) {}

  getEventos(params: any = {}): Observable<any> {
    let queryParams = new HttpParams()
      .set('apikey', this.apiKey)
      .set('ts', this.ts)
      .set('hash', this.hash)
      .set('limit', '100')

    for (let key in params) {
      queryParams = queryParams.set(key, params[key]);
    }

    return this.http.get<any>(this.apiUrl, { params: queryParams }).pipe(
      map(response => response.data.results.filter((comic: any) =>
        comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
      )),
      catchError(error => {
        console.error('Error al obtener los eventos:', error);
        return throwError(error);
      })
    );
  }
}