import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Project } from '../interfaces/project';
import {Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  Url:string='http://localhost:3000'
  
  constructor(private http:HttpClient,private router:Router) { }

  saveProject(item){
    return this.http.post<any>(`${this.Url}/projects`,item,{observe:'response'})
  }
  getProjects():Observable<HttpResponse<Project[]>>{
    return this.http.get<Project[]>(`${this.Url}/projects`,{observe:'response'})
  }
  viewProject(id):any{
    return this.http.get<Project>(`${this.Url}/project/${id}`)
  }
  updateProject(data):any{
    const editeddata=data;
    
    return this.http.post<any>(`${this.Url}/updateproject/${editeddata._id}`,editeddata,{observe:'response'})
 
  }
}
