import { Component, input, output, signal } from '@angular/core';
import { Post } from '../../../models/post.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-modal',
  imports: [],
  animations: [
    // 1. Animation for the dark background
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    // 2. Animation for the white card
    trigger('modalContainer', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
      ])
    ])
  ],
  standalone: true,
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  post = input<Post | null>(null);
  close = output<void>();
}
