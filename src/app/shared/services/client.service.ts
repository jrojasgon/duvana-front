import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class ClientService {

  constructor(private httpService: Http) { }

  getClients(): Observable<Array<string>> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.get('http://localhost:8080/clients.json', { headers: headers }).map(res => res.json());
  }
}
