import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer,],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  loginService = inject(LoginService);
}
