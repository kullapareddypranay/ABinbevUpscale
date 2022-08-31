import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DialogServiceService } from '../services/dialog-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 
  load:HTMLIonLoadingElement
  signUpForm:FormGroup
  submitted:Boolean=false
  message:string;
  constructor(private router:Router,private formBuilder:FormBuilder,private authService:AuthService,
    public dialogService:DialogServiceService,
    private toastController:ToastController,
    public loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.signUpForm=this.formBuilder.group({
      name:['',Validators.pattern('^[a-zA-Z ]*')],
      email:['',Validators.email],
      ph_no:['',Validators.pattern('[0-9]{10}')],
      password:['',Validators.minLength(8)]
    })
  }

   
  get f() {return this.signUpForm.controls}

  onSignup(){
    // this.presentLoader()
    this.submitted=true;
    if(this.signUpForm.invalid){
      return;
    }
    console.log(this.signUpForm.value)
    this.authService.userSignUp(this.signUpForm.value).subscribe((res:any)=>{
      console.log(res.status)
      if(res.status===201){
        console.log(res.body)
        localStorage.setItem('UserUpscaletoken',res.body.token);
        this.presentToast(res.body.message,'success');
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

  

}
