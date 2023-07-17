import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    const url = 'http://localhost:3000/create';
    return this.http.post(url, data);
  }
  read(): Observable<any> {
    const url = 'http://localhost:3000/reading';
    return this.http.get(url);
  }
  del(id: any): Observable<any> {
    const url = `http://localhost:3000/del/${id}`;
    return this.http.delete(url);
  }
  readid(id: any): Observable<any>{
    const url = `http://localhost:3000/readid/${id}`;
    return this.http.get(url);
  }

  search(searchkey: string): Observable<any> {
    const url = `http://localhost:3000/search?searchkey=${searchkey}`;
    return this.http.get(url);
  }
  edit(id: any, data: any): Observable<any> {
    const url = `http://localhost:3000/edit/${id}`;
    return this.http.put(url, data);
  }
}
