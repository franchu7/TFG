import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { matchPassword } from 'src/app/shared/functions/customValidators';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.scss']
})

/**
 * Formulario para cambiar la contraseña de un usuario registrado
 */
export class ChangePWComponent implements OnInit {

  // Formulario
  public changePWForm: FormGroup;

  // Comprobar si se ha enviado un formulario
  public formSubmitted: boolean;

  // Variable para cambiar el formato del campo de la contraseña
  public fieldTextType: boolean;

  // Variable para comprobar si se está cargando el proceso de envío del formulario
  public loading: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: NgToastService,
    private userService: UserService
  ) {
    this.changePWForm = this.fb.group({
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

  ngOnInit(): void {
  }

  // Método para el envío del formulario de cambio de contraseña
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.changePWForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }

    this.loading = true;

    const { email, password } = this.changePWForm.value;

    this.authService.updatePassword(email, password).subscribe((res) => {
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: "Contraseña cambiada correctamente", duration:3000});
        this.router.navigateByUrl('/auth/login');
      }    
    });

  }

  // Método para cambiar el formato del campo de la contraseña
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
