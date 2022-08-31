import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogServiceService } from '../services/dialog-service.service';

import { AddUserPage } from './add-user.page';

const routes: Routes = [
  {
    path: '',
    component: AddUserPage,
    canDeactivate:[DialogServiceService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUserPageRoutingModule {}
