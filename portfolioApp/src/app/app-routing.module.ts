import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./routes/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./routes/about/about.module').then( m => m.AboutModule)
  },
  {
    path: 'cv',
    loadChildren: () => import('./routes/cv/cv.module').then( m => m.CvModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./routes/projects/projects.module').then( m => m.ProjectsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./routes/contact/contact.module').then( m => m.ContactModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
