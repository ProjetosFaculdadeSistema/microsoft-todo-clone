import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'taskmaster_users';
  private readonly SESSION_KEY = 'taskmaster_session';

  // Registrar novo usuário
  register(name: string, email: string, password: string): boolean {
    const users = this.getUsers();
    const exists = users.some((u: any) => u.email === email);
    if (exists) return false;

    users.push({ name, email, password });
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

  // Fazer login
  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) return false;

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    return true;
  }

  // Sair
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Usuário atual
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.SESSION_KEY);
  }

  private getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }
}

