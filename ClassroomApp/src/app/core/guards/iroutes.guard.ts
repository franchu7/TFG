import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IroutesGuard implements CanActivate {

  constructor(private toastService: NgToastService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.toastService.error({detail: "Error", summary: "La ruta no existe", duration:3000});
    this.router.navigateByUrl(route.url.toString());
    return true;
  }
  
}
