import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { RegisterData } from 'src/app/core/models/auth-data';
import { matchPassword } from 'src/app/shared/models/customValidators';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

/**
 * Formulario para registrarse en la web
 */
export class SignupComponent implements OnInit {

  // Formulario
  public signupForm: FormGroup;

  // Comprobar si se ha enviado un formulario
  public formSubmitted: boolean;

  // Variable para cambiar el formato del campo de la contraseña
  public fieldTextType: boolean;

  // Variable para comprobar si se está cargando el proceso de envío del formulario
  public loading: boolean;

  // Datos de registro de usuario
  public dataForm!: RegisterData;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: NgToastService) {
    this.signupForm = this.fb.group({
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
      gender: [
        'Mujer'
      ],
      address: this.fb.group({
        roadType: [
          'C.'
        ],
        street: [
          '',
          [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZÀ-ÿ\\u00f1\\u00d1 ]+$/)
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
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{4,20}$/)
        ]
      ),
      confirmPassword: new FormControl(
        '',
        [
          Validators.required
        ]
      )
    }, {
      validators: matchPassword('password','confirmPassword')
    }
    ); 

    this.formSubmitted = false; 
    this.fieldTextType = false;
    this.loading = false;
    
  }

  // Método para el envío del formulario de registro
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.signupForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }
    this.loading = true;

    this.dataForm = this.signupForm.value;
    this.dataForm.role = "student";
    this.dataForm.avatar = "assets/img/user-avatar.png";
    console.log(this.dataForm);

    this.authService.register(this.dataForm).subscribe((res) => {
      console.log(res);
      if(res.status == 2) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.router.navigateByUrl('/auth/login');    
      }    
    });

  }

  // Método para cambiar el formato del campo de la contraseña
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  ngOnInit(): void {
  }

}
