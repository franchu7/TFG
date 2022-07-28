import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { catchError, map, Observable, of } from 'rxjs';
import { RegisterData, RegisterDataFromDB, TokenInfo, UserData } from 'src/app/core/models/auth-data';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHS: JwtHelperService,
    private toastService:NgToastService) {
  }

  public login(email: string, password: string) {
    return this.http.post<UserData>(env.apiUrl+'/auth/login-user.php', {email, password})
      .pipe(
        map(res => {
          if(res.status == 0) {
            return res;
          } 
          localStorage.setItem('token', res.token);
          return res;
        }),
      );
  }

  public isLoggedIn(): boolean {
    if(!this.getToken() || this.jwtHS.isTokenExpired(this.getToken()!)) {
      return false;
    }
    return true;
  }

  public logout() {
    localStorage.removeItem('token');
    this.toastService.success({detail: "¡Felicidades!", summary: 'El usuario ha cerrado la sesión', duration:3000});
    return true;
  }

  public getToken() {
    return localStorage.getItem('token')!;
  }

  public obtainToken() {
    return this.http.get<TokenInfo>(env.apiUrl+'/auth/read-user.php');
  }

  public register(data: RegisterData) {
    return this.http.post<UserData>(env.apiUrl+'/auth/create-user.php', data);
  }

  
}
