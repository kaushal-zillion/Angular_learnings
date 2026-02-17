import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/';
  getUser() {
    return this.http.get<User[]>(`${this.apiUrl}users`);
  }
  setUser(user: User) {
    return this.http.post<User>(`${this.apiUrl}users`, user);
  }
  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}users/${user.id}`, user);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}users/${id}`);
  }
  getUserById(id: string) {
    return this.http.get<User>(`${this.apiUrl}users/${id}`);
  }
}
