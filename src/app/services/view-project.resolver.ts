import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ViewProjectResolver implements Resolve<Project> {
  constructor(private projectService:ProjectService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Project>|Promise<Project>| Project {
    return this.projectService.viewProject(route.params.id)
  }
}
