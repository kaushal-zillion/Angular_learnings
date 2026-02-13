import { Component, computed, inject, signal, } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartService = inject(CartService);
  isShippingFree = false;

  subtotal(): number {
    let total = this.cartService.cart().reduce((total, item) => total + item.price * item.quantity, 0);
    return total;
  }

  total(): number {
    let shipping = 299;
    if (this.cartService.cart().length === 0) {
      shipping = 0;
    }

    this.isShippingFree ? 0 : 299;
    return this.subtotal() + shipping;
  }



}
