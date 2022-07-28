import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/data/services/auth/auth.service';
import { TokenInfo } from '../models/auth-data';

@Injectable({
  providedIn: 'root'
})

/**
 * Guard de control de acceso para un usuario no autenticado
 */
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: NgToastService,
    private jwtHS: JwtHelperService
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn()) {
        this.toastService.error({detail: "Usuario con sesión", summary: 'Cierre la sesión para continuar', duration:3000});
        const tokenInfo = this.jwtHS.decodeToken<TokenInfo>(this.authService.getToken()!);
        const role = tokenInfo.role;
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
