import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/product-list/product-list').then(m => m.ProductList) },
    { path: 'cart', loadComponent: () => import('./pages/cart/cart').then(m => m.Cart) },
];
