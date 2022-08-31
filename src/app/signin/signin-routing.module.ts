import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogServiceService } from '../services/dialog-service.service';

import { SigninPage } from './signin.page';

const routes: Routes = [
  {
    path: '',
    component: SigninPage,
    canDeactivate:[DialogServiceService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[DialogServiceService],
  exports: [RouterModule],
})
export class SigninPageRoutingModule {}
