import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';



@NgModule({
  imports: [
    ContactRoutingModule,
    CommonModule
  ],
  declarations: [
    ContactComponent
  ]
})
export class ContactModule { }
