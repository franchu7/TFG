import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { matchPassword } from 'src/app/shared/models/customValidators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-change-pw',
  templateUrl: './change-pw.component.html',
  styleUrls: ['./change-pw.component.scss']
})
export class ChangePWComponent implements OnInit {

  public changePWForm: FormGroup;
  public formSubmitted: boolean;
  public fieldTextType: boolean;
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

  public submitForm(): void {
    this.formSubmitted = true;
    if(this.changePWForm.invalid) {
      this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
      return;
    }

    this.loading = true;

    console.log(this.changePWForm.value);

    const { email, password } = this.changePWForm.value;

    this.userService.updateUser(email, password).subscribe((res) => {
      console.log(res);
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: "Contraseña cambiada correctamente", duration:3000});
        this.router.navigateByUrl('/auth/login');
      }    
    });

  }

  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
