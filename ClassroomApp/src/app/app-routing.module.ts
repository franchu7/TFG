import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/modules/auth/auth.module').then( (m) => m.AuthModule)
  },
  {
    canActivate: [RoleGuard],
    data: {expectedRole: 'admin'},
    path: 'admin',
    loadChildren: () =>
      import('src/app/modules/admin/admin.module').then( (m) => m.AdminModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'student',
    loadChildren: () =>
      import('src/app/modules/student/student.module').then( (m) => m.StudentModule)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
