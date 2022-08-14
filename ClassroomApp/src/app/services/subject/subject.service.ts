import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/core/models/apiResponse.model';
import { Subject } from 'src/app/core/models/subject.model';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio CRUD para la gestión de las asignaturas
 */
export class SubjectService {

  constructor(private http: HttpClient) { }

  public createSubject(subjectData: Subject) {
    return this.http.post<ResponseData>(env.apiUrl+'/subjects/create-subject.php', {subjectData});
  }

  // Eliminar una asignatura por su ID
  public deleteSubject(id: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/subjects/delete-subject.php', {id});
  }

  // Obtener la lista de asignaturas 
  public getSubjects() {
    return this.http.get<ResponseData>(env.apiUrl+'/subjects/get-subjects.php');
  }

  // Obtener los datos de una asignatura por su ID
  public getSubject(id: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/subjects/get-subject.php', {id});
  }

  // Actualizar los datos de una asignatura
  public updateSubject(id: number, subjectData: Subject) {
    return this.http.post<ResponseData>(env.apiUrl+'/subjects/update-subject.php', {id, subjectData});
  }
}
