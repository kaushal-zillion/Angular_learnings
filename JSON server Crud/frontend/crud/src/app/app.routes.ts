import { Routes } from '@angular/router';
import { UserList } from './pages/user-list/user-list';
import { AddUser } from './pages/add-user/add-user';

export const routes: Routes = [
    { path: 'users', component: UserList },
    { path: 'add-user', component: AddUser },
    { path: 'edit-user/:id', component: AddUser },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
];
