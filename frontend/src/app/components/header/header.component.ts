import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logado = false;
  nomeUsuario: string = '';

  constructor(private router: Router) {
    // Ao iniciar, aplica o tema salvo localmente
    const tema = localStorage.getItem('tema');
    if (tema === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  ngOnInit(): void {
    this.verificarLogin();

    // Verifica o login em mudanças de rota
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verificarLogin();
      }
    });
  }

  verificarLogin() {
    const token = localStorage.getItem('token');
    this.logado = !!token;

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.nomeUsuario = payload.name || 'Usuário';
      } catch (e) {
        this.nomeUsuario = 'Usuário';
      }
    } else {
      this.nomeUsuario = '';
    }
  }

  sair() {
    localStorage.removeItem('token');
    this.verificarLogin();
    this.router.navigate(['/']);
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'tema',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  }
}
