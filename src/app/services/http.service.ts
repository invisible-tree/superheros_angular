import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private jsonDataUrl = 'assets/mocks/superherosResponse.json';

  constructor(public http: HttpClient) { }

  public getData(): Observable<any> {
    return this.http.get(this.jsonDataUrl);
  }
}
