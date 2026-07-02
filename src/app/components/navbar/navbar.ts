import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [RouterLink],
})
export class Navbar {
  private authService = inject(AuthService);

  isLoggedIn = this.authService.loggedIn;

  loginUserName(): string {
    return this.authService.loginUserName();
  }

  logout() {
    this.authService.logout();
  }
}
