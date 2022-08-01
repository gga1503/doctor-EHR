import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  root = 'http://localhost:3000/'

  constructor(private http: HttpClient) {
  }

  get(destination: String, queries?: any): Observable<any> {
    if (queries) {
      const params = new HttpParams({fromObject: queries})
      return this.http.get<any>(this.root + destination, {params: params})
    }

    return this.http.get<any>(this.root + destination)
  }

  post(target: String, data: any): Observable<any> {
    return this.http.post<any>(this.root + target, data);
  }
}
