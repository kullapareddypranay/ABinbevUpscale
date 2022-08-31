import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  confirm(): boolean;
}

@Injectable()
export class DialogServiceService implements CanDeactivate < CanComponentDeactivate > {
  candeactivate:boolean = true;
  constructor(private alertController: AlertController){

  }
  canDeactivate(
    component: CanComponentDeactivate,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean>| Observable<boolean>{
   
    if (!component.confirm()) {
      // this.presentAlert()
      this.candeactivate=window.confirm('Are you sure you want to leave this page?');
    }
    return this.candeactivate;
    
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Warning',
      
      message: 'You have unsaved Changes! would you like to move away',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {return this.candeactivate=false }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { return this.candeactivate=true}
        }
      ]
    });

    await alert.present();
  }
}