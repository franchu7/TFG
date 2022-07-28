import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';
import { RegisterData, RegisterDataFromDB, TokenInfo, UserData } from 'src/app/core/models/auth-data';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio para gestionar la autenticación de usuarios (administradores y estudiantes)
 */
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHS: JwtHelperService,
    private toastService:NgToastService) {
  }


  // Método para iniciar sesión
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

  // Método para comprobar si el usuario ha inciiado sesión
  public isLoggedIn(): boolean {
    if(this.getToken()) {
      if(this.jwtHS.isTokenExpired(this.getToken()!)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  // Método para cerrar sesión 
  public logout() {
    localStorage.removeItem('token');
    this.toastService.success({detail: "¡Felicidades!", summary: 'El usuario ha cerrado la sesión', duration:3000});
    return true;
  }

  // Método para obtener el valor del token
  public getToken() {
    return localStorage.getItem('token');
  }

  /*public obtainToken() {
    return this.http.get<TokenInfo>(env.apiUrl+'/auth/read-user.php');
  }*/

  // Método para registrarse
  public register(data: RegisterData) {
    return this.http.post<UserData>(env.apiUrl+'/auth/create-user.php', data);
  }

  
}
