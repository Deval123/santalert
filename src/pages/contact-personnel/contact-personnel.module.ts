import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPersonnelPage } from './contact-personnel';

@NgModule({
  declarations: [
    ContactPersonnelPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPersonnelPage),
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContactPersonnelPageModule {}
