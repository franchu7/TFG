import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from 'src/app/core/models/auth-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get<any>(env.apiUrl+'/auth/get-users.php');
  }

  public getUser(id: number) {
    return this.http.post<any>(env.apiUrl+'/auth/get-user.php', {id});
  }

  public deleteUser(id: number) {
    return this.http.post<UserData>(env.apiUrl+'/auth/delete-user.php', {id});
  }

  public updateUser(email: string, password: string) {
    return this.http.post<UserData>(env.apiUrl+'/auth/update-user.php', {email, password});
  }
}
