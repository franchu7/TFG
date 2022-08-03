import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})

/**
 * Componente que representa al usuario registrado en la web
 */
export class StudentCardComponent implements OnInit {

  @Input() user: RegisterDataFromDB = {
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

  }


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService) {   
    }

  ngOnInit(): void {

  }

  
  // Borrar al usuario
  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.refresh();
    })
  }

  // Recargar la página 
  public refresh() {
    window.location.reload();
  }

  // Método para el diálogo de confirmación en el borrado de un usuario
  public openDialog(id: number): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `¿Está seguro/a de que quiere borrar al usuario?`
      })
      .afterClosed()
      .subscribe((confirmed: Boolean) => {
        if (confirmed) {
          this.deleteUser(id);
        }
      });
  }

  // Obtener la información del usuario mostrándola en otra página
  public getUserData(id: number) {
    this.router.navigateByUrl('/admin/user/'+id);
  }

  // Actualizar la información del usuario mostrándo los datos del usuario en otra página
  public updateUserData(id: number) {
    this.router.navigateByUrl('/admin/userUpdate/'+id);
  }

}
