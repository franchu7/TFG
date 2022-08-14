import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentGradesComponent } from './student-grades/student-grades.component';

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
    component: UpdateStudentComponent
  },
  {
    path: 'studentGrades',
    component: StudentGradesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
