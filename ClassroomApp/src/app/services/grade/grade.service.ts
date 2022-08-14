import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'src/app/core/models/apiResponse.model';
import { Grade } from 'src/app/core/models/grade.model';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio CRUD para la gestión de las calificaciones de los alumnos en sus asignatturas
 */
export class GradeService {

  constructor(private http: HttpClient) { }

  // Método para asociar uno o todos los alumnos con una asignatura
  public linkStudentSubject(studentID: number, subjectID: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/grades/link-student-subject.php', {studentID, subjectID});
  }

  // Método para obtener las calificaciones de los alumnos en sus asignaturas
  public getGrades(studentID: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/grades/get-grades.php', {studentID});
  }

  // Método para actualizar o poner la calificación de un alumno
  public updateGrade(grade: Grade) {
    return this.http.post<ResponseData>(env.apiUrl+'/grades/update-grade.php', {grade});
  }

   // Obtener las asignaturas de un estudiante dado su ID
   public getSubjectsByStudent(studentID: number) {
    return this.http.post<ResponseData>(env.apiUrl+'/grades/get-subjectsByStudent.php', {studentID});
  }
}
