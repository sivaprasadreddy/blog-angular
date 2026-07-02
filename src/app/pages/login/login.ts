import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, NgClass],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  error = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern(/\S/)]],
    password: ['', [Validators.required, Validators.pattern(/\S/)]],
  });

  login() {
    this.authService
      .login({
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || '',
      })
      .subscribe({
        next: (response) => {
          this.authService.setAuthUser(response);
          this.router.navigate(['/']);
        },
        error: () => {
          this.error.set('Invalid credentials');
        },
      });
  }
}
