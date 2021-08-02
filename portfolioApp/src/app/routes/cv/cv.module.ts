import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';



@NgModule({
  imports: [
    CvRoutingModule,
    CommonModule
  ],
  declarations: [
    CvComponent
  ]
})
export class CvModule { }
