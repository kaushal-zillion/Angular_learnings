import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  users = signal<User[]>([]);
  isLoading = signal(true);
  userService = inject(UserService);
  router = inject(Router);
  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  onDelete(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.users.update((users) =>
            users.filter((user) => user.id !== userId)
          );
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  onEdit(id: string) {
    this.router.navigate(['/edit-user', id]);
  }

}
