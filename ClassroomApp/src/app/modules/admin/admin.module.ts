import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentListComponent } from './student-list/student-list.component';
import { UpdateStudentComponent } from '../student/update-student/update-student.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDataComponent } from './subject-data/subject-data.component';
import { UpdateSubjectComponent } from './update-subject/update-subject.component';
import { LinkSubStuComponent } from './link-sub-stu/link-sub-stu.component';
import { UpdateGradeComponent } from './update-grade/update-grade.component';


@NgModule({
  declarations: [
    StudentListComponent,
    UpdateStudentComponent,
    CreateSubjectComponent,
    SubjectListComponent,
    SubjectDataComponent,
    UpdateSubjectComponent,
    LinkSubStuComponent,
    UpdateGradeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
