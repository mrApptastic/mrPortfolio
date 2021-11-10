import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    ShareModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
