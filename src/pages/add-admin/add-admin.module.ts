import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAdminPage } from './add-admin';

@NgModule({
  declarations: [
    AddAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAdminPage),
  ],
})
export class AddAdminPageModule {}
