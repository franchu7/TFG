import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from 'src/app/core/guards/noAuth.guard';
import { ChangePWComponent } from './changePW/change-pw.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'   
  },
  {
    canActivate: [NoAuthGuard],
    path: 'login',
    component: LoginComponent   
  },
  {
    path: 'signup',
    component: SignupComponent  
  },
  {
    path: 'changePW',
    component: ChangePWComponent 
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
