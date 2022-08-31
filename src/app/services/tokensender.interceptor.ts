import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokensenderInterceptor implements HttpInterceptor {

  handleError(error:HttpErrorResponse){
    console.log('errror occured')
    return throwError(error)
  }
  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenReq=request.clone({
      setHeaders:{
        Authorization:`Bearer ${this.authService.getToken()}`
      }
    })
    

    return next.handle(tokenReq).pipe(
      catchError(this.handleError)
    )
  }
}