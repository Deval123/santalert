import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartementPage } from './departement';

@NgModule({
  declarations: [
    DepartementPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartementPage),
  ],
})
export class DepartementPageModule {}
