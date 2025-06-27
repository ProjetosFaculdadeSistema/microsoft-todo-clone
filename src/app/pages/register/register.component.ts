import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private auth: AuthService, private router: Router) {}

  criarConta() {
    this.erro = '';
    if (this.password !== this.confirmPassword) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    const registrado = this.auth.register(this.name, this.email, this.password);
    if (registrado) {
      this.sucesso = true;
      setTimeout(() => this.router.navigate(['/login']), 1500);
    } else {
      this.erro = 'Já existe uma conta com esse email.';
    }
  }
}

