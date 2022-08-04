import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';
import { UserUpdateComponent } from '../../shared/components/user-update/user-update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/student/studentProfile',
    pathMatch: 'full'   
  },
  {
    path: 'studentProfile',
    component: UserProfileComponent  
  },
  {
    path: 'updateStudent',
    component: UserUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
