import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);

  currentUser = signal<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));

  signup(newUser: User) {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === newUser.email)) return alert('User exists!');

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login']);
  }

  login(creds: User): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === creds.email && u.password === creds.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser.set(user); // Update signal
      this.router.navigate(['/tasks']);
    } else {
      alert('Invalid credentials');
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}