import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    AboutRoutingModule,
    ShareModule
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
