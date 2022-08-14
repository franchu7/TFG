import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { RegisterData, RegisterDataFromDB } from 'src/app/core/models/auth-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  // Id del usuario
  public id!: number;

  public updateDataForm!: FormGroup;
  public loading: boolean;
  public formSubmitted;
  public dataForm!: RegisterData;

  // Datos para actualización
 


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

  selectedFile!: ImageSnippet;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastService: NgToastService,
    private router: Router,
    ) {
      if(this.route.snapshot.params['id']) {
        this.id = +this.route.snapshot.params['id']; 
        this.getUser();
      } else {
          this.getTokenData();
      }


      this.updateDataForm = this.fb.group({
        person: this.fb.group({
          name: [
            '',
            [
              Validators.required,
              Validators.maxLength(35),
              Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
            ]
          ],
          surname1: [
            '',
            [
              Validators.required,
              Validators.maxLength(35),
              Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
            ]
          ],  
          surname2: [
            '',
            [
              Validators.maxLength(35),
              Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
            ]
          ]
        }),
        dni: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{8}[a-zA-Z]$/)
          ]
        ],
        age: [
          '',
          [
            Validators.required,
            Validators.min(18)
          ]
        ],
        gender: [
          '',
          [
            Validators.required,
            Validators.pattern(/^Hombre|Mujer|Otro+$/)
          ]
        ],
        address: this.fb.group({

          street: [
            '',
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.pattern(/^(C. |Av. |Vía )[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
            ]
          ],
          streetNum: [
            '',
            [
              Validators.required,
              Validators.pattern(/^[0-9]{1,3}$/)
            ]
          ],
          floor: [
            '',
            [
              Validators.pattern(/^[0-9]{1,2}[º][a-zA-Z]$/)
            ]
          ]
        }),
        zipCode: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern(/^[0-9]{5}$/)
          ]
        ),  
        location: new FormControl(
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
          ]
        ),
        province: new FormControl(
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
          ]
        ),
        phoneNum: new FormControl(
          '',
          [
            Validators.required,
            Validators.pattern(/^(\\+34|0034|34)?[6789]([0-9]){8}$/)
          ]
        )    
      });
    
      this.loading = false;
      this.formSubmitted = false;
  }

  ngOnInit(): void {
  }

  // Método para el envío del formulario de registro
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.updateDataForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }
    this.loading = true;

    this.dataForm = this.updateDataForm.value;

    this.dataForm.avatar = document.getElementById('avatar')?.getAttribute('src')!;

    this.userService.updateStudent(this.id,this.dataForm).subscribe((res) => {
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.authService.obtainDecodeToken().subscribe((res) => {
          const role = res.data.role;
          if(role == 'student') {
            this.router.navigateByUrl('/student/studentProfile');
          } else {
            this.router.navigateByUrl('/admin/studentList');    
          }
        })
      }    
    });

  }

  public getTokenData() {  
    this.authService.obtainDecodeToken().subscribe((res) => {
      this.id = res.data.id;
      this.getUser();
    })
  }

  // Método para obtener los datos del usuario y mostrarlos en el formulario
  public getUser() {  
    this.userService.getUser(this.id).subscribe((res) => {
      this.userData = res.data[0];

      this.updateDataForm.get('person')!.setValue({
        name: this.userData.name,
        surname1: this.userData.surname1,
        surname2: this.userData.surname2,  
      });
      this.updateDataForm.get('address')!.setValue({
        street: this.userData.street,
        streetNum: this.userData.streetNum,
        floor: this.userData.floor
      });
      this.updateDataForm.patchValue({
        dni: this.userData.dni,  
        age: this.userData.age,
        gender: this.userData.gender,
        zipCode: this.userData.zipCode,
        location: this.userData.location,
        province: this.userData.province,
        phoneNum: this.userData.phoneNum
      });
    });
  }


  public onSelectImage(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.userData.avatar = event.target.result;
      }
    }
  }

}
