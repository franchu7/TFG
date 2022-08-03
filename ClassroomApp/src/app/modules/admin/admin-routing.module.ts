import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';

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
    component: UserDataComponent
  },
  {
    path: 'userUpdate/:id',
    component: UserUpdateComponent
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
