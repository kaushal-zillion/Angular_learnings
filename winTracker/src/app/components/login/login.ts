import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = ''; password = '';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  handleLogin() {
    if (this.authService.login({ email: this.email, password: this.password })) {
      const destination = this.route.snapshot.queryParams['returnUrl'] || '/tasks';
      // console.log(destination);
      this.router.navigateByUrl(destination);
    } else {
      // Basic error feedback
      alert('Login failed. Please check your credentials.');
    }
  }
}
