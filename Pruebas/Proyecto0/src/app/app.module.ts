import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstCompComponent } from './myComponents/first-comp/first-comp.component';
import { SecondCompComponent } from './myComponents/second-comp/second-comp.component';
import { ThirdCompComponent } from './myComponents/third-comp/third-comp.component';
import { MainService } from './myServices/main.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyPipePipe } from './myPipes/my-pipe.pipe';
import { MainInterceptor } from './myInterceptors/main.interceptor';
import { NewDirectiveDirective } from './myDirectives/new-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    FirstCompComponent,
    SecondCompComponent,
    ThirdCompComponent,
    MyPipePipe,
    NewDirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MainService,
    {provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
