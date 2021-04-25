import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPagesComponent } from './landing-pages/landing-pages.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'home-healt',
    component: LandingPagesComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'sign-up',
    component: RegisterUserComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home-healt'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
