import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  root = 'http://localhost:3000/'

  response: any = null

  constructor(private http: HttpClient) {
  }

  // async get(destination: String) {
  //   let response = null
  //
  //   await this.http.get<any>(this.root + destination).toPromise().then(
  //     resp => response = resp)
  //
  //   return response
  // }

  get(destination: String) {
    // let response = null

    return this.http.get<any>(this.root + destination)

    // return response
  }

  async post(destination: String, data: any) {
    let response = null

    await this.http.post(this.root + destination, data).toPromise()
      .then(resp => response = resp)
      .catch((e) => {
        console.error('Function error: on postUserLogin => ' + e);
      }
    );

    return response;
  }
}
