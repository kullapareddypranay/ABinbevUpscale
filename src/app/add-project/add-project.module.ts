import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProjectPageRoutingModule } from './add-project-routing.module';

import { AddProjectPage } from './add-project.page';

import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgSelectModule,
    AddProjectPageRoutingModule
  ],
  declarations: [AddProjectPage]
})
export class AddProjectPageModule {}
