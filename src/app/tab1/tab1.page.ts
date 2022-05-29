import { Component } from '@angular/core';
import { Project } from '../interfaces/project';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  projects: Project[] = [
    { "Title": 'Employeehub', "Description": "Africa site workday","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'Talent and management', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'ABI analytics', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'cop', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'LCA', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'LCA-hub', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'LCA-2', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'LCA-3', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] },
    { "Title": 'LCA-4', "Description": "T and D","ProjectStatus":"maintanance","ProjectMembers":[] }
  ];
  constructor() { }
  slidesOptions = {
    slidesPerView: 1.2
  }

  ionViewWillEnter() {

  }


}
