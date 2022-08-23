import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/myModels/user.model';
import { MainService } from 'src/app/myServices/main.service';

@Component({
  selector: 'app-second-comp',
  templateUrl: './second-comp.component.html',
  styleUrls: ['./second-comp.component.css']
})
export class SecondCompComponent implements OnInit {

  public users: User[];

  constructor(public mainService: MainService) { 
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.mainService.getUsers().subscribe((res) => {
      this.users = res;
      for(var user of this.users) {
        console.log(user);
      }
    });
  }

}
