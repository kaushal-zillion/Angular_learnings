import { effect, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, ProductModel } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private productsApiUrl = 'https://fakestoreapi.com/products';
  http = inject(HttpClient);
  cart = signal<CartItem[]>([]);
  toast = inject(ToastrService);

  constructor() {
    effect(() => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        this.cart.set(JSON.parse(storedCart));
      }
    });
  }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.productsApiUrl);
  }

  addToCart(item: ProductModel) {
    const currentCart = this.cart();
    const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
      this.toast.info('Item quantity updated in cart');
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }

    this.cart.set(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    existingItemIndex === -1 && this.toast.success('Item added to cart');
  }

  removeItem(itemId: number) {
    const updatedCart = this.cart().filter(item => item.id !== itemId);
    this.cart.set(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.toast.error('Item removed from cart');
  }

  decreaseQty(item: CartItem) {
    const currentCart = this.cart();
    const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      if (currentCart[existingItemIndex].quantity > 1) {
        currentCart[existingItemIndex].quantity -= 1;
      } else {
        currentCart.splice(existingItemIndex, 1);
      }
    }

    this.cart.set(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  increaseQty(item: CartItem) {
    const currentCart = this.cart();
    const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    }

    this.cart.set(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
}
