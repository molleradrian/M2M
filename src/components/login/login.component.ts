import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  private authService = inject(AuthService);

  email = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  login() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Simulate network delay
    setTimeout(() => {
      const success = this.authService.login(this.email(), this.password());
      if (!success) {
        this.errorMessage.set('Invalid credentials. Please try again.');
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
