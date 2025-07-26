import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';

  toggleTheme(): void {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  getTheme(): 'light' | 'dark' {
    return (localStorage.getItem(this.storageKey) as 'light' | 'dark') || 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem(this.storageKey, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  init() {
    this.setTheme(this.getTheme());
  }
}
