import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Results } from './models/results.model';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  cookieService = inject(CookieService);

  value1: number = 0;
  value2: number = 0;
  result = 0;
  results = signal<Results[]>([]);

  constructor() {
    effect(() => {
      this.cookieService.set('results', JSON.stringify(this.results()), { expires: 1, path: '/', secure: true, sameSite: 'Strict' });
    });
  }

  add() {
    this.result = this.value1 + this.value2;
    this.results.update(results => [...results, { value1: this.value1, value2: this.value2, operation: "+", result: this.result } as Results]);
  }

  subtract() {
    this.result = this.value1 - this.value2;
    this.results.update(results => [...results, { value1: this.value1, value2: this.value2, operation: "-", result: this.result } as Results]);
  }

  ngOnInit(): void {
    try {
      const results = this.cookieService.get('results');
      if (results) {
        this.results.set(JSON.parse(results));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
