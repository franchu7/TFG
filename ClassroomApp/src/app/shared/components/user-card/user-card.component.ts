import { Component, Input, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  

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

  result: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private toastService: NgToastService,
    private userService: UserService) { 
      
      
    }

  ngOnInit(): void {

  }

  

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log(res);
      this.refresh();
    })
  }

  public refresh() {
    window.location.reload();
  }

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

  public getUserData(id: number) {
    this.router.navigateByUrl('/admin/user/'+id);
  }

  


 

}
