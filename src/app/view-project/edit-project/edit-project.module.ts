import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProjectPageRoutingModule } from './edit-project-routing.module';

import { EditProjectPage } from './edit-project.page';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    IonicModule,
    EditProjectPageRoutingModule
  ],
  declarations: [EditProjectPage]
})
export class EditProjectPageModule {}
