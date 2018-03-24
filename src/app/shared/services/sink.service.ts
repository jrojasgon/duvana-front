import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams, ResponseContentType } from '@angular/http';
import { Sink } from '../model/sink.model';
import { Params } from '@angular/router';
import * as FileSaver from 'file-saver';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class SinkService {

  constructor(private httpService: Http) { }

  getSinksData(params: Params): Observable<Array<Sink>> {
    console.log("launch search");
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let myParams = new URLSearchParams();
    myParams.set('reference', params.ref);
    myParams.set('clientName', params.client);
    myParams.set('from', params.from);
    myParams.set('to', params.to);

    let options = new RequestOptions({ headers: headers, params: myParams });

    return this.httpService.get('http://localhost:8080/search/test', options).map(res => res.json());;
  }

  downloadFile(sinks: Array<Sink>) {

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let params = new URLSearchParams();

    sinks.forEach(sink => {
      console.log(sink.id);
      params.append("ids", sink.id.toString());
    });

    console.log(params);

    let options = new RequestOptions({ headers: headers, params: params, responseType: ResponseContentType.Blob });
    this.httpService
      .get("http://localhost:8080/duvana/downloadExcel", options)
      .subscribe(response => {
        let blob = new Blob([response.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        console.log(blob);
        var filename = 'Comptes-Serveurs.xlsx';
        saveAs(blob, filename);
      });
  }

  private handleError(erreur: Response | any) {
    let messageErreur: string;
    if (erreur instanceof Response) {
      const body = erreur.json() || '';
      const err = body.error || JSON.stringify(body);
      messageErreur = `${erreur.status} - ${erreur.statusText || ''} ${err}`;
    } else {
      messageErreur = erreur.message ? erreur.message : erreur.toString();
    }
    console.error(messageErreur);
    return Observable.throw(messageErreur);
  }
}
