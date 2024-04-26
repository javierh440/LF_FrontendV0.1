import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AlertService } from "./alert.service";
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{    
    constructor(private alertService: AlertService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          console.log(error);
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // Aquí puedes manejar el error de acuerdo a tus necesidades
         
          this.alertService.error(errorMessage, "Error del servidor");
          // Puedes mostrar un mensaje de error al usuario, redireccionar a una página de error, etc.

          return throwError(errorMessage);
        })
      );
    }
  }