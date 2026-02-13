import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroShoppingCart, } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
  providers: [provideIcons({
    heroShoppingCart,
  })],
})

export class Header {
  cartService = inject(CartService);
}
