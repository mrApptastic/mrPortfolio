import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvComponent } from './cv.component';
import { CvRoutingModule } from './cv-routing.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CvRoutingModule,
    ShareModule
  ],
  declarations: [
    CvComponent
  ]
})
export class CvModule { }
