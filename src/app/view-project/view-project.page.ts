import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { Project } from '../interfaces/project';
import { User } from '../interfaces/user';
import { ProjectService } from '../services/project.service';
import { EditProjectPage } from './edit-project/edit-project.page';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.page.html',
  styleUrls: ['./view-project.page.scss'],
})
export class ViewProjectPage implements OnInit {

  message:string
  user:User
  project:Project;
  Original:Project;
  canedit:boolean=false;
  startediting:boolean=false;
  constructor(private route:ActivatedRoute,public toastController:ToastController,private projectService:ProjectService,private router:Router,private modalCtrl: ModalController) { }

  ngOnInit() {
    this.route.data.subscribe((data:{project:Project,user:HttpResponse<User>})=>{
      // console.log(data.project)
      // console.log(data.user)
      if(data.user.status===200){
        this.user=data.user.body
      }
      this.project=data.project
      this.Original=data.project
      this.project.projectowner.forEach((ele:User)=>{
        if(ele._id==this.user._id){
          this.canedit=true
        }
      })
    })
  }

  edit(project:Project){
    this.startediting=true;
    this.openModal()
  }

  async openModal() {
    
    const modal = await this.modalCtrl.create({
      component: EditProjectPage,
      componentProps: {
        project: this.project
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // console.log(data)
      this.project=data;
      this.projectService.updateProject(data).subscribe((res)=>{
      
        if(res.status===201){
          // console.log(res)
          this.presentToast('Updated','success');
        }
      })
    }
    if(role==='cancel'){
      this.projectService.viewProject(this.Original._id).subscribe((res:Project)=>{
        this.project=res
      })

    }
  
     
    
    
  }

  async presentToast(msg,color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: color,
      position:'top',
      buttons: [
        {
          text: 'x',
          side:'end',
          role: 'cancel',
          handler: () => {
            toast.dismiss();
          }
        }
      ]
    });
    toast.present();
  }

}
