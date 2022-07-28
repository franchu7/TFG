import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { RegisterDataFromDB } from 'src/app/core/models/auth-data';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users:RegisterDataFromDB[];

  constructor(
    private authService: AuthService,
    private router:Router,
    private toastService: NgToastService,
    private userService: UserService) 
  {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.users;    
    })
  }

  public logout() {
    this.authService.logout();
    console.log("LOGOUT");
    this.router.navigateByUrl("/auth/login");
  }
}
