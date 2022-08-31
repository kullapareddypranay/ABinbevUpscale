import { Component } from '@angular/core';
import { Project } from '../interfaces/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  projects: Project[] = [
   
  ];
  constructor( private router: Router,
    private route: ActivatedRoute,private projectService:ProjectService) { }
  slidesOptions = {
    slidesPerView: 1.2
  }

  ionViewWillEnter() {
    this.projectService.getProjects().subscribe((res)=>{
      this.projects=res.body
    })
  }

  moveTo(){
    this.router.navigate(["../add-project"],{relativeTo:this.route})
  }

  // viewProject(id){
  //   this.router.navigate(['view-project',id],{relativeTo:this.route})
  // }

}
