import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignTasksPageRoutingModule } from './assign-tasks-routing.module';

import { AssignTasksPage } from './assign-tasks.page';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgSelectModule,
    AssignTasksPageRoutingModule
  ],
  declarations: [AssignTasksPage]
})
export class AssignTasksPageModule {}
