import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

/**
 * Lista de alumnos registrados en la web
 */
export class StudentListComponent implements OnInit {

  // Usuarios guardados
  public users:RegisterDataFromDB[];

  constructor(
    private authService: AuthService,
    private router:Router,
    private userService: UserService) 
  {
    this.users = [];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  // Método para obtener los alumnos y guardar sus datos
  public getStudents() {
    this.userService.getStudents().subscribe((res) => {
      this.users = res.data;    
    })
  }
}
