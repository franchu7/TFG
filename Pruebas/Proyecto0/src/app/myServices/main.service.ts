import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../myModels/user.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }
}
