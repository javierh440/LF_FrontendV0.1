import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVICIOS, TipoContribuyente,TipoDocumento } from '../config/config';
import { Contribuyente } from '@models/contribuyente';

@Injectable({
    providedIn: 'root'
})
export class ContribuyenteService {

    private apiUrl: string = `${URL_SERVICIOS}/contribuyente`;

    private _tipoContribuyente: TipoContribuyente[] = [TipoContribuyente.NATURAL,TipoContribuyente.JURIDICO];
    private _tipoDocumento: TipoDocumento[] = [TipoDocumento.DNI,TipoDocumento.RUC];
    

    constructor(private http: HttpClient) { }

    getAllContribuyentes() {
        return this.http.get(this.apiUrl);
    }

    getContribuyentesPage(page: string,size:string): Observable<any> { 
        const params = new HttpParams()
        .set('page',page)
        .set('size',size);
        return this.http.get(`${this.apiUrl}/pagina`,{params:params});
    }

    getContribuyenteById(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get(url);
    }

    createContribuyente(contribuyente: Contribuyente): Observable<any> {
        return this.http.post(this.apiUrl, contribuyente);
    }

    updateContribuyente(id: number, contribuyente: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put(url, contribuyente);
    }

    deleteContribuyente(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }

    get tipoContribuyente(): TipoContribuyente[] {
        return [...this._tipoContribuyente];
    }

    get tipoDocumento(): TipoDocumento[] {
        return [...this._tipoDocumento];
    }
    

    
}