import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  erro = '';

  constructor(private auth: AuthService, private router: Router) {}

  fazerLogin() {
    const sucesso = this.auth.login(this.email, this.password);
    if (sucesso) {
      this.router.navigate(['/dashboard']);
    } else {
      this.erro = 'Email ou senha inválidos';
    }
  }
}


