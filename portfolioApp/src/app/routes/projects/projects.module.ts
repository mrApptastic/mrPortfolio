import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    ProjectsRoutingModule,
    ShareModule
  ],
  declarations: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
