import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url = './assets/data/red-helmet.json';

  constructor(private http: HttpClient) { }
  
  getData(): Observable<any> {
    return this.http.get(this.url);  
  }
}
