import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public router: Router) {}

  comecarAgora() {
    const logado = !!localStorage.getItem('token');
    this.router.navigate([logado ? '/dashboard' : '/registro']);
  }
}
