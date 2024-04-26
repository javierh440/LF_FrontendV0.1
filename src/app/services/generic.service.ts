import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  private apiUrl: string = `${URL_SERVICIOS}`;

  constructor(private http: HttpClient) { }
  

  getAll(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${endpoint}`);
  }
  getAllPage(endpoint: string, page: string,size:string): Observable<any> { 
    const params = new HttpParams()
    .set('page',page)
    .set('size',size);
    return this.http.get(`${this.apiUrl}/${endpoint}/pages`,{params:params});
}

  getById(endpoint: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

  create(endpoint: string,data: T): Observable<T> {
    console.log(data);
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  update(endpoint: string, id: number | string, data: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}/${id}`, data);
  }

  delete(endpoint:string, id: number | string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}/${id}`);
  }

}
