import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['olivia@example.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required]]
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    
    const { email, password } = this.loginForm.value;

    // Simulate network delay
    setTimeout(() => {
      // Use non-null assertion as they are required by validators
      const success = this.authService.login(email!, password!); 
      if (!success) {
        this.errorMessage.set('Invalid credentials. Please try again.');
        this.loginForm.get('password')?.reset('');
      }
      this.isLoading.set(false);
    }, 500);
  }

  loginWithGoogle() {
    // In a real app, this would trigger the OAuth flow.
    // For this simulation, we will log in the user directly.
    this.authService.login('olivia@example.com', 'password123');
  }
}