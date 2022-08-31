import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Url:string='http://localhost:3000'
  constructor(private http:HttpClient,private router:Router) { }
  userSignUp(user){
    return this.http.post<any>(`${this.Url}/signup`,user,{observe:'response'})
  }
  userSignIn(user){
    return this.http.post<any>(`${this.Url}/signin`,user,{observe:'response'})
  }
  searchUser(querry){
    const body={querry:querry}
    return this.http.post<any>(`${this.Url}/users/search`,body,{observe:'response'})
  
  }
  getUser():Observable<HttpResponse<User>>{
    return this.http.get<User>(`${this.Url}/getUser`,{observe:'response'})
  }

  getOnboardingusers():Observable<HttpResponse<User[]>>{
    return this.http.get<User[]>(`${this.Url}/users/onboardingusers`,{observe:'response'})
  }

  
  addOnboardingTask(body){
    return this.http.post<any>(`${this.Url}/addOnboardingTask`,body,{observe:'response'});
  }
  getTasks(){
    return this.http.get<any>(`${this.Url}/getOnboardingTasks`,{observe:'response'})
  }

  createUser(body){
    return this.http.post<any>(`${this.Url}/createuser`,body,{observe:'response'})
  }
  getToken(){
    return localStorage.getItem('UserUpscaletoken');
  }
  loggedIn(){
    return !!localStorage.getItem('UserUpscaletoken')
  }

  removeToken(){
    localStorage.removeItem('UserUpscaletoken')
  }
}
