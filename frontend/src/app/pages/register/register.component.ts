import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ IMPORTADO
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ INCLUÍDO
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  erro = '';
  sucesso = false;

  constructor(private http: HttpClient, private router: Router) {}

  criarConta() {
    this.erro = '';

    if (this.password !== this.confirmPassword) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    this.http.post<any>('http://localhost:5000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.sucesso = true;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.erro = err.error?.message || 'Erro ao criar conta.';
      }
    });
  }
}
