import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  load:HTMLIonLoadingElement
  signInForm:FormGroup
  submitted:Boolean=false
  message:string;
  constructor(private router:Router,private formBuilder:FormBuilder,private authService:AuthService,public toastController:ToastController,
    public loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.signInForm=this.formBuilder.group({
      id:['',Validators.required],
      password:['',Validators.minLength(8)]
    })
  }

  get f() {return this.signInForm.controls}

  onSignin(){
    // this.presentLoader()
     this.submitted=true;
    if(this.signInForm.invalid){
      return;
    }
    this.authService.userSignIn(this.signInForm.value).subscribe((res:any)=>{
      if(res.status===200){
        localStorage.setItem('UserUpscaletoken',res.body.token);
        this.presentToast("User login Successfull",'success');
        // this.load.dismiss()
        this.router.navigate(['../tabs/Account'])
        
     
      }
      else{
        this.message=res.body.message
        this.presentToast(this.message,'danger');
        // this.load.dismiss()
        this.router.navigate(['../tabs/Account'])
      
     
      }
      // this.load.dismiss()
     
      
    },(err)=>{
      this.presentToast('An error occured please try again later','danger');
      // this.load.dismiss()
    })
    
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

  confirm(): boolean {
    if(this.submitted){
      return true
    }else{
      return  !this.signInForm.dirty;
    }
   
  }
}
