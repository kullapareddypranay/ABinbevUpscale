import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import {PopoverController} from '@ionic/angular'
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { ProjectService } from '../services/project.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit,OnDestroy {

  
message:string
  teammembers:any;

  someSubscription:any;
 
  users:User[]=[]
  submitted:Boolean=false;
  projectForm:FormGroup;
  dateValue:any;
  public items$: User[];
  
  public input$ = new Subject<string | null>();
  
  constructor(private route:ActivatedRoute,private router:Router,private formBuilder:FormBuilder,private authService:AuthService,private projectService:ProjectService,public toastController:ToastController,private popover:PopoverController) { }

  ngOnInit() {
    this.projectForm=this.formBuilder.group({
      projecttitle:['',Validators.required],
      projectdescription:[''],
      projectstatus:[''],
      projectmembers:[[]],
      projectstakeholders:[[]],
      projectstartdate:[''],
      projectunder:[''],
      projectowner:[[]],
      projectlink:['']
    })
    this.projectForm.enable()
    this.input$.pipe(debounceTime(700),distinctUntilChanged(),switchMap((input)=>{return this.authService.searchUser(input)})).subscribe(data=>{
      
      this.users=data.body;
      // console.log(this.users);
      this.items$=this.users
      // console.log(this.items$);
    })

  }

    ionViewWillEnter() {
      
    
      this.projectForm=this.formBuilder.group({
        projecttitle:['',Validators.required],
        projectdescription:[''],
        projectstatus:[''],
        projectmembers:[[]],
        projectstakeholders:[[]],
        projectstartdate:[''],
        projectunder:[''],
        projectowner:[[]],
        projectlink:['']
      })
      this.projectForm.enable()
    
    
     this.input$.pipe(debounceTime(700),distinctUntilChanged(),switchMap((input)=>{return this.authService.searchUser(input)})).subscribe(data=>{
      
      this.users=data.body;
      // console.log(this.users);
      this.items$=this.users
      // console.log(this.items$);
    })

    
  }

  get f() {return this.projectForm.controls}

  confirm(): boolean {
    if(this.submitted){
      return true
    }else{
      return  !this.projectForm.dirty;
    }
   
  }
  getDate(event){
    this.dateValue=event
  }
  
  get date():any{
    return this.dateValue
  }
  set date(value:any){
    this.dateValue=value;
  }
  onAdd(){
    this.submitted=true;
   
    if(this.projectForm.invalid){
      return;
    }
    console.log(this.projectForm.value)
   this.someSubscription= this.projectService.saveProject(this.projectForm.value).subscribe((res:any)=>{
      console.log(res.status)
      if(res.status===201){
        console.log(res.body)
       
       this.presentToast(res.body.message,'success');
       this.projectForm.reset();
       
      this.projectForm.markAsPristine();
      this.projectForm.markAsUntouched();
      this.router.navigate(['../Home'],{relativeTo:this.route})
       
        
      }
      else{
        this.message=res.body.message
        this.presentToast(this.message,'danger');
        // this.load.dismiss()
       
       
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
  close(){
    this.popover.dismiss()
  }
  cancel(){
    this.popover.dismiss()
    this.dateValue=''
  }
  
  ngOnDestroy(){
    // this.input$.unsubscribe();
  }
  ionViewDidLeave(){
    console.log('left');
    // this.input$.unsubscribe();
    // this.someSubscription.unsubscribe()
    
    
  }
 
  customActionSheetOptions = {
    header: 'Status',
    subHeader: 'Select the Project status'
  };
}


