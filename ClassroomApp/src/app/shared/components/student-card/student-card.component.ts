import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data.model';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})

/**
 * Componente que representa al alumno registrado en la web
 */
export class StudentCardComponent implements OnInit {

  // Datos del alumno
  @Input() user: RegisterDataFromDB = {
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

  }


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService) {   
    }

  ngOnInit(): void {

  }

  
  // Borrar al alumno
  public deleteStudent(id: number) {
    this.userService.deleteStudent(id).subscribe((res) => {
      this.refresh();
    })
  }

  // Recargar la página 
  public refresh() {
    window.location.reload();
  }

  // Método para el diálogo de confirmación en el borrado de un alumno
  public openDialog(id: number): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `¿Está seguro/a de que quiere borrar al usuario?`
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this.deleteStudent(id);
        }
      });
  }

  // Obtener la información del usuario mostrándola en otra página
  public getStudentData(id: number) {
    this.router.navigateByUrl('/admin/student/'+id);
  }

  // Actualizar la información del usuario mostrándo los datos del usuario en otra página
  public updateStudentData(id: number) {
    this.router.navigateByUrl('/admin/studentUpdate/'+id);
  }

  // Obtener las calificaciones del alumno y mostrarlas en otra página
  public getStudentGrades(id: number) {
    this.router.navigateByUrl('/admin/grades/'+id);
  }

}
