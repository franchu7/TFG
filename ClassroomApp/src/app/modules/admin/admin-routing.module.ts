import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from '../../shared/components/user-update/user-update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/userList',
    pathMatch: 'full'   
  },
  {
    path: 'userList',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: UserProfileComponent
  },
  {
    path: 'userUpdate/:id',
    component: UserUpdateComponent
  },
  {
    path: 'adminProfile',
    component: UserProfileComponent
  },
  {
    path: '**',
    redirectTo: '/admin/userList'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
