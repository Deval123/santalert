import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjoutDepartementPage } from './ajout-departement';

@NgModule({
  declarations: [
    AjoutDepartementPage,
  ],
  imports: [
    IonicPageModule.forChild(AjoutDepartementPage),
  ],
})
export class AjoutDepartementPageModule {}
