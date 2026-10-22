import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Client } from '../models/client';
import { DashboardService } from '../services/dashboard.service';
import { ClientsPagination } from '../components/clients-pagination/clients-pagination';
import { DashboardKpi } from '../components/dashboard-kpi/dashboard-kpi';
import { ClientsList } from '../components/clients-list/clients-list';
// import { DashboardCard } from '../components/dashboard-card/dashboard-card';

@Component({
  imports: [
    DashboardKpi,
    ClientsList,
    ClientsPagination,
    // DashboardCard
  ],
  selector: 'app-dashboard-page',
  styleUrl: './dashboard-page.css',
  templateUrl: './dashboard-page.html',
})

export class DashboardPage implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  readonly clients = signal<Client[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly itemsPerPage = 5;
  readonly currentPage = signal(1);

  readonly totalClients = computed(
    () => this.clients().length
  );

  readonly activeClients = computed(
    () => this.clients().filter(
      client => client.status === 'active'
    ).length
  );

  readonly totalPages = computed(
    () => Math.max(
      1,
      Math.ceil(this.totalClients() / this.itemsPerPage)
    )
  );

  readonly paginatedClients = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;

    return this.clients().slice(
      start,
      start + this.itemsPerPage
    );
  });

  readonly paginationStart = computed(() => {
    if (this.totalClients() === 0) {
      return 0;
    }

    return (this.currentPage() - 1) * this.itemsPerPage + 1;
  });

  readonly paginationEnd = computed(() =>
    Math.min(
      this.currentPage() * this.itemsPerPage,
      this.totalClients()
    )
  );

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.dashboardService.getClients().subscribe({
      next: response => {
        console.log('Réponse complète de l’API :', response);
        console.log('Clients reçus :', response.data?.length);

        this.clients.set(response.data ?? []);
        this.currentPage.set(1);
        this.isLoading.set(false);
      },

      error: error => {
        console.error('Erreur lors du chargement des clients', error);

        this.errorMessage.set(
          'Impossible de récupérer les clients.'
        );

        this.isLoading.set(false);
      },
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }
}
