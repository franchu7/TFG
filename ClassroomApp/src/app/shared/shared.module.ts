import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { StudentCardComponent } from './components/student-card/student-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    StudentCardComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ConfirmDialogComponent,
    StudentCardComponent,
    NavbarComponent,
    FooterComponent  
  ]
})
export class SharedModule { }
