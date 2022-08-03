import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, Subject } from 'rxjs';
import { RegisterData, RegisterDataFromDB } from 'src/app/core/models/auth-data';
import { UserService } from 'src/app/shared/services/user.service';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  // Id del usuario
  public id: number;

  public updateDataForm: FormGroup;
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
    private fb: FormBuilder,
    private toastService: NgToastService,
    private router: Router,
    ) {
      this.id = +this.route.snapshot.params['id']; 

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

  getRoadType(street: string) {
    const streetArray = street.split(" ");
    return streetArray[0];
  }

  ngOnInit(): void {
    this.getUser();
  }

  // Método para el envío del formulario de registro
  public submitForm(): void {
    this.formSubmitted = true;
    /*if(this.updateDataForm.dirty) {
      if(this.updateDataForm.invalid) {
        
        this.toastService.error({detail: "Error en el formulario", summary: "Los datos introducidos no son correctos", duration:3000});
        return;
      }     
    }*/

    //this.updateDataForm

    if(!this.updateDataForm.get('person.name')?.dirty) {
      this.updateDataForm.get('person.name')?.setValue(this.userData.name);
    }

    if(!this.updateDataForm.get('person.surname1')?.dirty) {
      this.updateDataForm.get('person.surname1')?.setValue(this.userData.surname1);
    }

    if(!this.updateDataForm.get('person.surname2')?.dirty) {
      this.updateDataForm.get('person.surname2')?.setValue(this.userData.surname2);
    }

    if(!this.updateDataForm.get('dni')?.dirty) {
      this.updateDataForm.get('dni')?.setValue(this.userData.dni);
    }

    if(!this.updateDataForm.get('gender')?.dirty) {
      this.updateDataForm.get('gender')?.setValue(this.userData.gender);
    }

    if(!this.updateDataForm.get('address.street')?.dirty) {
      this.updateDataForm.get('address.street')?.setValue(this.userData.street);
    }

    if(!this.updateDataForm.get('address.streetNum')?.dirty) {
      this.updateDataForm.get('address.streetNum')?.setValue(this.userData.streetNum);
    }

    if(!this.updateDataForm.get('address.floor')?.dirty) {
      this.updateDataForm.get('address.floor')?.setValue(this.userData.floor);
    }

    this.loading = true;

    this.dataForm = this.updateDataForm.value;
    
    

    this.dataForm.avatar = document.getElementById('avatar')?.getAttribute('src')!;
    console.log(this.dataForm);

    /*this.userService.updateUser(this.id,this.dataForm).subscribe((res) => {
      console.log(res);
      if(res.status == 0) {
        this.loading = false;
        this.toastService.error({detail: "Error en el servidor", summary: res.message, duration:3000});
      } else {
        this.toastService.success({detail: "¡Felicidades!", summary: res.message, duration:3000});
        this.router.navigateByUrl('/admin/userList');    
      }    
    });*/

  }

  // Método para obtener los datos del usuario y guardarlos
  public getUser() {  
    this.userService.getUser(this.id).subscribe((res) => {
      this.userData = res.data[0];
    });
  }


  public onSelectImage(e:any) {
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.userData.avatar = event.target.result;
        console.log(this.userData.avatar);
      }
    }
  }

}
