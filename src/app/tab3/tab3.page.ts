import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User
  account: boolean = false;
  constructor(public actionSheetcontroller: ActionSheetController,
    private router: Router,
    private route: ActivatedRoute,) { }


  ngOnInit() {
    this.route.data.subscribe((data: { login: any, data: { body: User } }) => {
      this.account = data.login.login
      if (this.account) {
        data.login.data.subscribe(async (res) => {
         
          this.user = await res.body
        })

      }

      if (!this.account) {
        this.presentActionSheet();
      }
    })



  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetcontroller.create({
      header: 'My account',
      cssClass: 'my-custom-class',
      animated: true,
      backdropDismiss: true,
      translucent: true,
      buttons: [{
        text: 'SignUp',
        icon: 'add',
        handler: () => {
          this.router.navigate(['../signup'], { relativeTo: this.route })
        }
      }, {
        text: 'Signin',
        icon: 'log-in',
        handler: () => {
          this.router.navigate(['../signin'], { relativeTo: this.route })
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  addUser(){
    this.router.navigate(["add-user"],{relativeTo:this.route})
  }

  buttonClick(){
    this.router.navigate(["assign-tasks"],{relativeTo:this.route})
  }

}
