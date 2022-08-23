import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstCompComponent } from './myComponents/first-comp/first-comp.component';
import { SecondCompComponent } from './myComponents/second-comp/second-comp.component';
import { ThirdCompComponent } from './myComponents/third-comp/third-comp.component';
import { GuardGuard } from './myGuards/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'secondComp',
    pathMatch: 'full'
  },
  {
    canActivate: [GuardGuard],
    data: {expectedID: '0'},
    path: 'firstComp',
    component: FirstCompComponent,
    pathMatch:'full'
  },
  {
    path: 'secondComp',
    component: SecondCompComponent,
    pathMatch:'full'
  },
  {
    path: 'thirdComp',
    component: ThirdCompComponent,
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'thirdComp'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
