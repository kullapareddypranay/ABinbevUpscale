import { Component } from '@angular/core';
import { Project } from '../interfaces/project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  projects: Project[] = [
   ];
  constructor(private router: Router,
    private route: ActivatedRoute,private projectService:ProjectService) {}
  ionViewWillEnter() {
    this.projectService.getProjects().subscribe((res)=>{
      this.projects=res.body
    })
  }
  viewProject(id){
    this.router.navigate(['view-project',id],{relativeTo:this.route})
  }


}
