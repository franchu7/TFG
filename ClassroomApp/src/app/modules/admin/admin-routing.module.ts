import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from 'src/app/shared/components/user-profile/user-profile.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UpdateStudentComponent } from '../student/update-student/update-student.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDataComponent } from './subject-data/subject-data.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { LinkSubStuComponent } from './link-sub-stu/link-sub-stu.component';
import { StudentGradesComponent } from '../student/student-grades/student-grades.component';
import { UpdateGradeComponent } from './update-grade/update-grade.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/studentList',
    pathMatch: 'full'   
  },
  {
    path: 'studentList',
    component: StudentListComponent
  },
  {
    path: 'student/:id',
    component: UserProfileComponent
  },
  {
    path: 'studentUpdate/:id',
    component: UpdateStudentComponent
  },
  {
    path: 'grades/:id',
    component: StudentGradesComponent
  },
  {
    path: 'adminProfile',
    component: UserProfileComponent
  },
  {
    path: 'createSubject',
    component: CreateSubjectComponent
  },
  {
    path: 'linkSubjectStudent',
    component: LinkSubStuComponent
  },
  {
    path: 'subjectList',
    component: SubjectListComponent
  },
  {
    path: 'subject/:id',
    component: SubjectDataComponent
  },
  {
    path: 'subjectUpdate/:id',
    component: UpdateSubjectComponent
  },
  {
    path: 'updateGrade/:id',
    component: UpdateGradeComponent
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
