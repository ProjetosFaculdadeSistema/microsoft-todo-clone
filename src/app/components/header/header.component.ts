import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {
    this.user = this.auth.getCurrentUser();
  }

  logout() {
    this.auth.logout();
    this.user = null;
    this.router.navigate(['/']);
  }
}

