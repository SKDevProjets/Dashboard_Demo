import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  selector: 'app-dashboard-layout',
  styleUrl: './dashboard-layout.css',
  templateUrl: './dashboard-layout.html',
})
export class DashboardLayout {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
    });
  }
}
