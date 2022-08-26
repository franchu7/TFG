import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterData } from 'src/app/core/models/auth-data.model';
import { ResponseData } from 'src/app/core/models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio CRUD (excepto create) para la gestión de los usuarios
 */
export class UserService {

  constructor(private http: HttpClient) { }

  // Obtener la lista de alumnos 
  public getStudents() {
    return this.http.get<ResponseData>(env.apiUrl+'/users/get-students.php');
  }

  // Obtener un usuario por su ID
  public getUser(id: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/users/get-user.php', {id});
  }

  // Eliminar un alumno por su ID
  public deleteStudent(id: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/users/delete-student.php', {id});
  }

  

  // Actualizar los datos de un alumno
  public updateStudent(id:number, userData: RegisterData) {
    return this.http.post<ResponseData>(env.apiUrl+'/users/update-student.php', {id,userData});
  }
}
