import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-assign-tasks',
  templateUrl: './assign-tasks.page.html',
  styleUrls: ['./assign-tasks.page.scss'],
})
export class AssignTasksPage implements OnInit {

  newtask:string
  users:User[]=[];
  tasks:any[]=[
    
]
  constructor(private authService:AuthService,public toastController:ToastController,private popover:PopoverController) { }

  selectedusers:User[]
  ngOnInit() {
    this.authService.getOnboardingusers().subscribe((res)=>{
      if(res.status===200){
        this.users=res.body
      }
    })
    this.authService.getTasks().subscribe((res)=>{
      if(res.status===200){
        console.log(res.body)
        this.tasks=res.body
      }
    })
  }

  onAdd(i,id,user){
    console.log(this.newtask);
    if(!this.newtask){
      return
    }else{
      this.tasks[i].tasks.push({task:this.newtask,status:false,_id:""})
    const body={
      user:user,
      _id:id,
      task:this.newtask
    }
    this.authService.addOnboardingTask(body).subscribe((res)=>{
      console.log(res);
      if(res.status===200){
        this.presentToast("Added","success")
      }else{
        this.presentToast("Failed! Please try again Later","success")
      }
    })
    }
    

  }

  buttonClick(){

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
