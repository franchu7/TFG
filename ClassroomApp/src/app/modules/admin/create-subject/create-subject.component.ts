import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { Subject } from 'src/app/core/models/subject.model';


@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss']
})

/**
 * Registrar una asignatura en la clase
 */
export class CreateSubjectComponent implements OnInit {

  // Formulario para la creación de la asignatura
  public subjectForm: FormGroup;

  // Comprobar si se ha enviado un formulario
  public formSubmitted: boolean;

  // Variable para comprobar si se está cargando el proceso de envío del formulario
  public loading: boolean;

  // Datos de la asignatura
  public subjectData!: Subject;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private router: Router,
    private toastService: NgToastService
  ) {
    this.subjectForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.maxLength(255)
        ]]
    });
    this.formSubmitted = false;
    this.loading = false;
  }

  ngOnInit(): void {
  }

  // Método para el envío del formulario de creación de una asignatura
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.subjectForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }

    this.loading = true;

    this.subjectData = this.subjectForm.value;

    this.subjectData.avatar = "assets/img/subject.jpg";

    this.subjectService.createSubject(this.subjectData).subscribe((res) => {
      if(res.status != 1) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.router.navigateByUrl('/admin/subjectList');      
      }     
    });
  }
}
