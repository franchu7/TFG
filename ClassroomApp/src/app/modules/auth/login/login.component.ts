import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { TokenInfo } from 'src/app/core/models/auth-data';
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Formulario para iniciar sesión
 */
export class LoginComponent implements OnInit {

  // Formulario
  public loginForm: FormGroup;

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
    private jwtHS: JwtHelperService
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{4,20}$/)
        ]]
    });
    this.formSubmitted = false;
    this.fieldTextType = false;
    this.loading = false;
  }

  ngOnInit(): void {
  }

  // Método para el envío del formulario de inicio de sesión
  public submitForm(): void {
    this.formSubmitted = true;
    if(this.loginForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }

    this.loading = true;

    console.log(this.loginForm.value);

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((res) => {
      console.log(res);
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Bienvenido!", summary: res.message, duration:3000});
        const tokenInfo = this.jwtHS.decodeToken<TokenInfo>(this.authService.getToken()!);
        const role = tokenInfo.role;
        if(role == 'admin') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/student');
        }
        
      }     
    });
  }

  // Método para cambiar el formato del campo de la contraseña
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
