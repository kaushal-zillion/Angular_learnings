import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductModel } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-list',
  imports: [MatProgressSpinnerModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  
})
export class ProductList implements OnInit, OnDestroy {
  cartService = inject(CartService);
  products = signal<ProductModel[]>([]);
  isLoading = signal(true);
  productSub!: Subscription;
  
  ngOnInit(): void {
    this.productSub = this.cartService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

}
