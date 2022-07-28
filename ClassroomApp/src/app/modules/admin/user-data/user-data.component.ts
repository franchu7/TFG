import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  public id: number;
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

  constructor(private route: ActivatedRoute,
    private userService: UserService) {
      this.id = +this.route.snapshot.params['id']; 
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser() {  
    this.userService.getUser(this.id).subscribe((res) => {
      this.userData = res.data[0];
      console.log(this.userData);
    })
  }

}
