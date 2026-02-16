import { effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users = signal<User[]>(JSON.parse(localStorage.getItem('users') || '[]'));
  isloggedIn = signal<boolean>(JSON.parse(localStorage.getItem('isloggedIn') || 'false'));
  router = inject(Router);
  setUser = (user: User) => {
    this.users.update(existUsers => [...existUsers, user]);
    localStorage.setItem('users', JSON.stringify(this.users()));
  }

  setIsLoggedIn = (value: boolean) => {
    this.isloggedIn.set(value);
    localStorage.setItem('isloggedIn', JSON.stringify(this.isloggedIn()));
  }

  setLogout = () => {
    this.setIsLoggedIn(false);
    localStorage.setItem('isloggedIn', JSON.stringify(this.isloggedIn()));
    this.router.navigate(['/login']);
  }
}