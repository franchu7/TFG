import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { TokenInfo } from 'src/app/core/models/auth-data.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

/**
 * Componente para la barra de navegación
 */
export class NavbarComponent implements OnInit {

  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(
    private authService: AuthService,
    private router:Router,
    private jwtHS: JwtHelperService) { }

  ngOnInit(): void {
  }

  // Método para cerrar sesión
  public logout() {
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }

  // Obtener rol del usuario que ha iniciado sesión
  public getRoleUser() {
    if(this.authService.getToken()) {
      const tokenInfo = this.jwtHS.decodeToken<TokenInfo>(this.authService.getToken()!);
      const role = tokenInfo.role;
      return role;
    } else {
      return;
    }
    
  }

}
