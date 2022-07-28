import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { TokenInfo } from '../models/auth-data';
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: NgToastService,
    private jwtHS: JwtHelperService
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const expectedRole = route.data.expectedRole;

      if(!this.authService.isLoggedIn()) {
        console.log('El usuario no ha iniciado sesión o ha expirado');
        this.toastService.error({detail: "¡Prohibido!", summary: 'El usuario no ha iniciado sesión', duration:3000});
        this.router.navigateByUrl('/auth/login');
        return false;
      } 

      

      const tokenInfo = this.jwtHS.decodeToken<TokenInfo>(this.authService.getToken());
      const role = tokenInfo.role;

      if(role != expectedRole) {
        console.log('Usuario no autorizado');
        this.toastService.error({detail: "¡Prohibido!", summary: 'Acceso no autorizado', duration:3000});
        console.log(route.url.toString());
        if(role == 'admin') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/student');
        }
        
        return false;
      }
      return true;
  }
  
}
