import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data.model';
import { SubjectFromDB } from 'src/app/core/models/subject.model';
import { GradeService } from 'src/app/services/grade/grade.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-link-sub-stu',
  templateUrl: './link-sub-stu.component.html',
  styleUrls: ['./link-sub-stu.component.scss']
})

/**
 * Asociar una asignatura con un alumno para poder calificarle
 */
export class LinkSubStuComponent implements OnInit {

  // Id del usuario
  public id!: number;

  // Formulario para el enlace del alumno o alumnos y la asignatura
  public linkForm!: FormGroup;

  // Variable para comprobar si se está cargando el proceso de envío del formulario
  public loading: boolean;

  // Comprobar si se ha enviado un formulario
  public formSubmitted;

  // Lista de alumnos registrados
  public studentList!: RegisterDataFromDB[];

  // Lista de asignaturas registradas en la clase
  public subjectList!: SubjectFromDB[];

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private toastService: NgToastService,
    private gradeService: GradeService,
    private router: Router) {
      this.linkForm = this.fb.group({
        studentID: [
          '',
          Validators.required
        ],
        subjectID: [
          '',
          Validators.required
        ]
      });
      this.loading = false;
      this.formSubmitted = false;
  }

  ngOnInit(): void {
    this.getStudents();
    this.getSubjects();
  }

  // Método para obtener los alumnos y guardar sus datos
  public getStudents() {
    this.userService.getStudents().subscribe((res) => {
      this.studentList = res.data; 
    })
  }

  // Método para obtener las asignaturas y guardar sus datos
  public getSubjects() {
    this.subjectService.getSubjects().subscribe((res) => {
      this.subjectList = res.data; 
        
    })
  }

  // Método para el envío del formulario
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.linkForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }
    this.loading = true;

    const {studentID, subjectID} = this.linkForm.value;
    console.log(this.linkForm.value);

    this.gradeService.linkStudentSubject(studentID,subjectID).subscribe((res) => {
      console.log(res);
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.router.navigateByUrl('/admin/subjectList');    
      }    
    });

  }
}
