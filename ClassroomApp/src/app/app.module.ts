import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { SubjectService } from './services/subject/subject.service';
import { GradeService } from './services/grade/grade.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgToastModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService,
     {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},

    AuthService,
    UserService,
    SubjectService,
    GradeService,
    NgToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
