import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink
],
})
export class NavbarComponent {

  constructor(private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loginUserName() : string {
    return this.authService.loginUserName();
  }

  logout() {
    this.authService.logout()
  }

}
