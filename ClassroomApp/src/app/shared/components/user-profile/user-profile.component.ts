import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  public id!: number;

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

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService) {
      if(this.route.snapshot.params['id']) {
        this.id = +this.route.snapshot.params['id']; 
        this.getUser();
      } else {
          this.getTokenData();
      } 
  }

  ngOnInit(): void {
  }

  // Método para obtener los datos del usuario y guardarlos
  public getTokenData() {  
    this.authService.obtainDecodeToken().subscribe((res) => {
      this.id = res.data.id;
      this.getUser();
    })
  }

  // Método para obtener los datos del usuario y guardarlos
  public getUser() {  
    this.userService.getUser(this.id).subscribe((res) => {
      this.userData = res.data[0];
    })
  }


}
