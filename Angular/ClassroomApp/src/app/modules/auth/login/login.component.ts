import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/core/models/auth-data';
import { AuthService } from 'src/app/data/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public formSubmitted: boolean;
  public fieldTextType: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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
          Validators.minLength(4),
          Validators.maxLength(20),
        ]]
    });
    this.formSubmitted = false;
    this.fieldTextType = false;
  }

  ngOnInit(): void {
  }

  public submitForm(): void {
    this.formSubmitted = true;
    if(this.loginForm.invalid) {
      console.log('ERROR EN EL FORMULARIO');
      return;
    }

    console.log(this.loginForm.value);

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe (() => {
      console.log("Usuario loggeado");
    });

  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
