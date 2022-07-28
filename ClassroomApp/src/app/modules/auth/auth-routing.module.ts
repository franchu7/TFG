import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/core/guards/admin.guard';
import { ChangePWComponent } from './changePW/change-pw/change-pw.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'   
  },
  {
    canActivate: [AdminGuard],
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
