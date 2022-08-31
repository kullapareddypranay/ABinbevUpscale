import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewProjectPage } from './view-project.page';

const routes: Routes = [
  {
    path: '',
    component: ViewProjectPage
  },
  {
    path: 'edit-project',
    loadChildren: () => import('./edit-project/edit-project.module').then( m => m.EditProjectPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProjectPageRoutingModule {}
