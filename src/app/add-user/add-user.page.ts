import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  users:User[]=[]
  submitted:Boolean=false;
  userForm:FormGroup;
  public items$: User[];
  tasks:any[]=[
    {task:'Training materials',status:false},
    {task:'Orientation details',status:false},
    {task:'Team details',status:false}
]
  
  public input$ = new Subject<string | null>();
  
  constructor(private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private authService:AuthService,public toastController:ToastController,private popover:PopoverController) { }

  ngOnInit() {
    this.userForm=this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.email],
      ph_no:['',[Validators.minLength(10),Validators.maxLength(10)]],
      password:[''],
      user_level:[''],
      buddy:[''],
      reportingTo:[''],
      designation:[''],
      aliasname:[''],
      mentorTo:[[]],
      onboardingcompleted:[false],
      tasks:[this.tasks],
      team:['',Validators.required]
    })
    
    this.input$.pipe(debounceTime(700),distinctUntilChanged(),switchMap((input)=>{return this.authService.searchUser(input)})).subscribe(data=>{
      
      this.users=data.body;
      // console.log(this.users);
      this.items$=this.users
    })
  }

  
  get f() {return this.userForm.controls}

  confirm(): boolean {
    if(this.submitted){
      return true
    }else{
      return  !this.userForm.dirty;
    }
  }

  onAdd(){
    this.submitted=true;
    if(this.userForm.invalid){
      return;
    }
    const password=this.userForm.value.ph_no
    this.userForm.patchValue({password:password})
    console.log(this.userForm.value)
    
    this.authService.createUser(this.userForm.value).subscribe((res)=>{
      if(res.status===201){
        console.log(res.body)
       
       this.presentToast(res.body.message,'success');
       this.router.navigate(['../'],{relativeTo:this.route})
      }else{
        this.presentToast(res.body.message,'danger');
        this.router.navigate(['../'],{relativeTo:this.route})
      }
    },(err)=>{
      this.presentToast('An error occured please try again later','danger');
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
