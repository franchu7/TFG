import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubjectCardComponent } from './components/subject-card/subject-card.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    StudentCardComponent,
    NavbarComponent,
    FooterComponent,
    UserProfileComponent,
    SubjectCardComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ConfirmDialogComponent,
    StudentCardComponent,
    NavbarComponent,
    FooterComponent,
    SubjectCardComponent
  ]
})
export class SharedModule { }
