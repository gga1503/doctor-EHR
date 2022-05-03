import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  root = 'http://localhost:3000/'

  constructor(private http: HttpClient) {
  }

  get(destination: String): Observable<any> {
    return this.http.get<any>(this.root + destination)
  }

  post(target: String, data: any): Observable<any> {
    return this.http.post<any>(this.root + target, data);
  }

  // async get(destination: String) {
  //   let response = null
  //
  //   await this.http.get<any>(this.root + destination).toPromise().then(
  //     resp => response = resp)
  //
  //   return response
  // }


  // async post(destination: String, data: any) {
  //   let response = null
  //
  //   await this.http.post(this.root + destination, data).toPromise()
  //     .then(resp => response = resp)
  //     .catch((e) => {
  //         console.error('Function error: on postUserLogin => ' + e);
  //       }
  //     );
  //
  //   return response;
  // }
}
