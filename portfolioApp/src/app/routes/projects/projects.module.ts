import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
