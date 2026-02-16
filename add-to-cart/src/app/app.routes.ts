import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { guardGuard } from './auth/guard-guard';

export const routes: Routes = [
    { path: '', canActivate: [guardGuard], loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList) },
    { path: 'cart', canActivate: [guardGuard], loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
    { path: 'login', component: Login }
];
