import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data.model';
import { Grade } from 'src/app/core/models/grade.model';
import { Subject } from 'src/app/core/models/subject.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GradeService } from 'src/app/services/grade/grade.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})

/**
 * Calificaciones de un alumno
 */
export class StudentGradesComponent implements OnInit {

  // ID del alumno
  public id!: number;

  // Rol del usuario que ha iniciado sesión
  public role!: string;

  // Calificaciones registradas del alumno por asignatura
  public grades: Grade[];

  // Asignaturas del alumno
  public subjects: Subject[];


  // Datos del usuario
  public userData: RegisterDataFromDB = {
    id: 0,
    email: '',
    password: '',
    name: '',
    surname1: '',
    surname2: '',
    dni: '',
    age: 0,
    gender: '',
    street: '',
    streetNum: '',
    floor: '',
    zipCode: '',
    location: '',
    province: '',
    phoneNum: '',
    role: '',
    avatar: '',
  };

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private gradeService: GradeService,
    private subjectService: SubjectService) {
      this.subjects = [];
      this.grades = [];
      if(this.route.snapshot.params['id']) {
        this.id = +this.route.snapshot.params['id']; 
        this.role = 'admin';
        this.getUser();
        this.getUserGrades(); 
      } else {
          this.role = 'student'; 
          this.getUserID();
                          
      } 
      
  }

  ngOnInit(): void {
  }

  // Método para obtener el ID del usuario que ha iniciado sesión
  public getUserID() {  
    this.authService.obtainDecodeToken().subscribe((res) => {
      this.id = res.data.id;
      this.getUser();
      this.getUserGrades(); 
    })
  }

  // Método para obtener los datos del usuario y guardarlos
  public getUser() {  
    this.userService.getUser(this.id).subscribe((res) => {
      this.userData = res.data[0]; 
    })
  }

  // Método para obtener la lista de calificaciones, el ID del alumno y el ID de las asignaturas
  public getUserGrades() {
    this.gradeService.getGrades(this.id).subscribe((res) => {
      this.grades = res.data;
      if(this.grades) {
        for(var grade of this.grades) {
          this.getSubject(grade.subject_id);        
        }
      }   
    })
  }

  // Método para obtener la asignatura dado su ID
  public getSubject(id: number) {  
    this.subjectService.getSubject(id).subscribe((res) => {
      this.subjects.push(res.data[0]);
    })
  }
}
