import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Grade } from 'src/app/core/models/grade.model';
import { SubjectFromDB } from 'src/app/core/models/subject.model';
import { GradeService } from 'src/app/services/grade/grade.service';

@Component({
  selector: 'app-update-grade',
  templateUrl: './update-grade.component.html',
  styleUrls: ['./update-grade.component.scss']
})

/**
 * Actualizar la calificación de un alumno en una asignatura
 */
export class UpdateGradeComponent implements OnInit {

  // Id del usuario
  public id!: number;

  // Formulario para la actualización de la calificación
  public gradeForm!: FormGroup;

  // Variable para comprobar si se está cargando el proceso de envío del formulario
  public loading: boolean;

  // Comprobar si se ha enviado un formulario
  public formSubmitted;

  // Lista de asignaturas
  public subjectList: SubjectFromDB[];

  // Calificación actualizada
  public updatedGrade!: Grade;

  constructor(private fb: FormBuilder,
    private toastService: NgToastService,
    private gradeService: GradeService,
    private router: Router,
    private route: ActivatedRoute) {
      this.id = +this.route.snapshot.params['id'];
      this.gradeForm = this.fb.group({
        subject_id: [
          '',
          Validators.required
        ],
        grade: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d{0,2}(\.\d{0,2}){0,1}$/)
          ]
          
        ]
      });
      this.loading = false;
      this.formSubmitted = false;
      this.subjectList = [];
  }

  ngOnInit(): void {
    this.getSubjects();
  }

  // Método para obtener las asignaturas del alumno
  public getSubjects() {
    this.gradeService.getSubjectsByStudent(this.id).subscribe((res) => {
      if(res.data) {
        for(var subject of res.data) {
          this.subjectList.push(subject[0]);
        }
      }  
    })
  }

  // Método para el envío del formulario
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.gradeForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }
    this.loading = true;

    this.updatedGrade = this.gradeForm.value;
    this.updatedGrade.student_id = this.id;

    this.gradeService.updateGrade(this.updatedGrade).subscribe((res) => {
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.router.navigateByUrl('/admin/grades/'+this.id);    
      }    
    });

  }

}
