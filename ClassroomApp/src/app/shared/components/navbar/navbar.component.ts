import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/data/services/auth/auth.service';

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
    private router:Router) { }

  ngOnInit(): void {
  }

  // Método para cerrar sesión
  public logout() {
    console.log("LOGOUT");
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }

}
