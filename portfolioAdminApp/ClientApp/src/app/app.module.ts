import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EditCertificatesComponent } from './edit-certificates/edit-certificates.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { EditEducationsComponent } from './edit-educations/edit-educations.component';
import { EditExperiencesComponent } from './edit-experiences/edit-experiences.component';
import { EditInterestsComponent } from './edit-interests/edit-interests.component';
import { EditLanguagesComponent } from './edit-languages/edit-languages.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { EditQualificationsComponent } from './edit-qualifications/edit-qualifications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EditCertificatesComponent,
    EditEducationsComponent,
    EditExperiencesComponent,
    EditInterestsComponent,
    EditLanguagesComponent,
    EditProjectsComponent,
    EditQualificationsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthorizeGuard] },
      { path: 'certificates', component: EditCertificatesComponent, canActivate: [AuthorizeGuard] },
      { path: 'educations', component: EditEducationsComponent, canActivate: [AuthorizeGuard] },
      { path: 'experiences', component: EditExperiencesComponent, canActivate: [AuthorizeGuard] },
      { path: 'interests', component: EditInterestsComponent, canActivate: [AuthorizeGuard] },
      { path: 'languages', component: EditLanguagesComponent, canActivate: [AuthorizeGuard] },
      { path: 'projects', component: EditProjectsComponent, canActivate: [AuthorizeGuard] },
      { path: 'qualifications', component: EditQualificationsComponent, canActivate: [AuthorizeGuard] }
    ]),
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
