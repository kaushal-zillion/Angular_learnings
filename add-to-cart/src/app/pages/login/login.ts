import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginService = inject(LoginService);
  fb = inject(FormBuilder);
  router = inject(Router);
  toastr = inject(ToastrService);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginService.users().find(user => user.email === this.loginForm.value.email && user.password === this.loginForm.value.password);
      if (user) {
        this.loginService.setIsLoggedIn(true);
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Invalid email or password');
      }
    }
  }

}
