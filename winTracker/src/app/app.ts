import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  auth = inject(AuthService);
}

// Progress on Angular Task App : 
// Project Architecture: Set up a standalone Angular app structure. - Authentication System: Created AuthService with Signals, implemented Login/Signup with localStorage, and built a functional authGuard. - Task Management: Created TaskService with Signals for CRUD operations (Create, Read, Update, Delete). - UI/UX: Integrated Tailwind CSS and used the latest Angular control flow (@if, @for). - Troubleshooting: Resolved signal truthiness and RouterLink issues.