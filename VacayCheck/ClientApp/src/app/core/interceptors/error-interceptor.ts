import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
        () => { },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status == 404) {  
              console.log('404 not found error');
            }
            if (error.status == 401) {
              // redirect to login
              // this.auth.logout();
              console.log('you are not authorized');
            }
            if (error.status == 204) {
              console.log('no content');
            }
          }
        }
    ))
  }
}
