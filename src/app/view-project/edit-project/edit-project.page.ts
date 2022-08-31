import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Project } from 'src/app/interfaces/project';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { element } from 'protractor';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnInit {

  name: string;
  project:Project;
  addmembers:boolean=false
  addmemberstext:string='Add Members';
  addstackmembers:boolean=false;
  addstackmemberstext:string='Add StakeMembers'
  projectmembers;
  projectstackholders;
  public items$: User[];

  
  public input$ = new Subject<string | null>();
  constructor(private modalCtrl: ModalController,private authService:AuthService,private popover:PopoverController) {}

  

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.project, 'confirm');
  }

  close(){
    this.popover.dismiss()
  }
  cancel1(){
    this.popover.dismiss()
  }

  ngOnInit() {
    // console.log(this.project);
    this.input$.pipe(debounceTime(700),distinctUntilChanged(),switchMap((input)=>{return this.authService.searchUser(input)})).subscribe(data=>{
      
     
      // console.log(this.users);
      this.items$=data.body
      // console.log(this.items$);
    })
  }

  openAddMembers(){
    if(this.addmembers){
      this.addmembers=false
      this.addmemberstext='Add Members'
    }else{
      this.addmembers=true
      
      this.addmemberstext='Close';
    }
  }
  openAddstackMembers(){
    if(this.addstackmembers){
      this.addstackmembers=false;
      this.addstackmemberstext='Add StakeMembers'
    }else{
      this.addstackmembers=true;
      this.addstackmemberstext='Close'
    }
  }
  addMembers(){
    let found=false;
   this.project.projectmembers.forEach(element=>{
    if(element._id==this.projectmembers._id){
      found=true;
      
    }
   })
   if(!found){
    this.project.projectmembers.push(this.projectmembers)
   }
    
    
    // console.log(this.projectmembers)
    // console.log(this.project)
  }
  removemembers(ele){
    console.log(ele._id)
    const memebers=[]
    this.project.projectmembers.forEach((element)=>{
      if(ele._id!=element._id){
        memebers.push(element)
      }
    })
    console.log(memebers)
    this.project.projectmembers=memebers
  }

  addstackMembers(){
    let found=false;
   this.project.projectstakeholders.forEach(element=>{
    if(element._id==this.projectstackholders._id){
      found=true;
      
    }
   })
   if(!found){
    this.project.projectstakeholders.push(this.projectstackholders)
   }
    
    
    // console.log(this.projectmembers)
    // console.log(this.project)
  }
  removestackholders(ele){
    const memebers=[]
    this.project.projectstakeholders.forEach((element)=>{
      if(ele._id!=element._id){
        memebers.push(element)
      }
    })
    console.log(memebers)
    this.project.projectstakeholders=memebers
  }
}
