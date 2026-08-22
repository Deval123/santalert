import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPersonelPage } from './add-personel';

@NgModule({
  declarations: [
    AddPersonelPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPersonelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddPersonelPageModule {}
