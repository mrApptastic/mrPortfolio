import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    ContactRoutingModule,
    ShareModule
  ],
  declarations: [
    ContactComponent
  ]
})
export class ContactModule { }
