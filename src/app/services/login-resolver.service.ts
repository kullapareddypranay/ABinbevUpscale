import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginResolverService {

  constructor(private authService:AuthService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>|Promise<any>|any{
     if(this.authService.loggedIn())
     {
      return {login:this.authService.loggedIn(),data:this.authService.getUser()}
    }
     return this.authService.loggedIn()
  }
  
}
