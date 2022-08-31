import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogServiceService } from '../services/dialog-service.service';

import { AddProjectPage } from './add-project.page';

const routes: Routes = [
  {
    path: '',
    component: AddProjectPage,
    canDeactivate:[DialogServiceService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers:[DialogServiceService],
  exports: [RouterModule],
})
export class AddProjectPageRoutingModule {}
