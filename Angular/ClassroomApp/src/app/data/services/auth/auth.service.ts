import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserData } from 'src/app/core/models/auth-data';
import { environment as env } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(email: string, password: string) {
    return this.http.post<UserData>(env.url+'/auth/login-user.php', {email, password})
      .pipe(
        map((r) => {
          if()
          localStorage.setItem('token', r.jwt);
          this.router.navigateByUrl('/home');
        })
      );
  }
}
