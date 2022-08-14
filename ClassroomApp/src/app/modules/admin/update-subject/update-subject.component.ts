import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subject, SubjectFromDB } from 'src/app/core/models/subject.model';
import { SubjectService } from 'src/app/services/subject/subject.service';



@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.scss']
})

/**
 * Actualizar datos de una asignatura
 */
export class UpdateSubjectComponent implements OnInit {

  // Id de la asignatura
  public id!: number;

  // Formulario para la actualización de la asignatura
  public updateSubjectForm!: FormGroup;

  // Variable para comprobar si se está cargando el proceso de envío del formulario
  public loading: boolean;

  // Comprobar si se ha enviado un formulario
  public formSubmitted;

  // Datos actualizados de la asignatura
  public subjectUpdated!: Subject;

  // Datos de la asignatura
  public subjectData: SubjectFromDB = {
    id: 0,
    name: '',
    description: '',
    avatar: ''
  };

  constructor(private route: ActivatedRoute,
    private subjectService: SubjectService,
    private fb: FormBuilder,
    private toastService: NgToastService,
    private router: Router,
    ) {
      
      this.id = +this.route.snapshot.params['id']; 
      this.getSubject();

      this.updateSubjectForm = this.fb.group({
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
    
      this.loading = false;
      this.formSubmitted = false;
  }

  ngOnInit(): void {
  }

  // Método para el envío del formulario
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.updateSubjectForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }
    this.loading = true;

    this.subjectUpdated = this.updateSubjectForm.value;

    this.subjectUpdated.avatar = document.getElementById('avatar')?.getAttribute('src')!;

    this.subjectService.updateSubject(this.id,this.subjectUpdated).subscribe((res) => {
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.router.navigateByUrl('/admin/subjectList');    
      }    
    });

  }

  // Método para obtener los datos de la asignatura y mostrarlos en el formulario
  public getSubject() {  
    this.subjectService.getSubject(this.id).subscribe((res) => {
      this.subjectData = res.data[0];

      this.updateSubjectForm.setValue({
        name: this.subjectData.name,
        description: this.subjectData.description, 
      });
    });
  }


  // Obtener y actualizar la imagen de avatar de la asignatura tras su carga
  public onSelectImage(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.subjectData.avatar = event.target.result;
      }
    }
  }

}
