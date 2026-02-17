import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})

export class AddUser implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
  });

  userId = this.route.snapshot.paramMap.get('id');
  onSubmit() {
    if (this.userId) {
      this.userService.updateUser({ ...this.userForm.value, id: this.userId } as User).subscribe({
        next: (user) => {
          console.log('User updated:', user);
          this.userForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating user:', err),
      });
    } else {
      const newUser = { ...this.userForm.value, id: Date.now().toString() };
      this.userService.setUser(newUser as User).subscribe({
        next: (user) => {
          console.log('User added:', user);
          this.userForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error adding user:', err),
      });
    }
  }

  ngOnInit() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.userForm.patchValue(user);
        },
        error: (err) => console.error('Error fetching user:', err),
      });
    }
  }

}
