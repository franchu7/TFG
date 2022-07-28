import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserData } from 'src/app/core/models/auth-data';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio CRUD (excepto create) para la gestión de los usuarios
 */
export class UserService {

  constructor(private http: HttpClient) { }

  // Obtener la lista de usuarios 
  public getUsers() {
    return this.http.get<any>(env.apiUrl+'/auth/get-users.php');
  }

  // Obtener un usuario por su ID
  public getUser(id: number) {
    return this.http.post<any>(env.apiUrl+'/auth/get-user.php', {id});
  }

  // Eliminar un usuario por su ID
  public deleteUser(id: number) {
    return this.http.post<UserData>(env.apiUrl+'/auth/delete-user.php', {id});
  }

  // Actualizar la contraseña de un usuario (posteriormente para actualizar cualquier dato)
  public updateUser(email: string, password: string) {
    return this.http.post<UserData>(env.apiUrl+'/auth/update-user.php', {email, password});
  }
}
