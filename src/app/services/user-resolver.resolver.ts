import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverResolver implements Resolve<HttpResponse<User>> {
  constructor(private authService:AuthService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HttpResponse<User>>  {
    return this.authService.getUser();
  }
}
