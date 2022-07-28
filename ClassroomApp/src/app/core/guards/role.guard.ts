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

/**
 * Guard de control de acceso para un administrador
 */
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
        this.toastService.error({detail: "¡Prohibido!", summary: 'El usuario no ha iniciado sesión', duration:3000});
        this.router.navigateByUrl('/auth/login');
        return false;
      } 

      const tokenInfo = this.jwtHS.decodeToken<TokenInfo>(this.authService.getToken()!);
      const role = tokenInfo.role;

      if(role != expectedRole) {
        this.toastService.error({detail: "¡Prohibido!", summary: 'Acceso no autorizado', duration:3000});
        this.router.navigateByUrl('/student');      
        return false;
      }
      return true;
  }
  
}
