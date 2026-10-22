import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dashboard-card',
  styleUrl: './dashboard-card.css',
  templateUrl: './dashboard-card.html',
})
export class DashboardCard {
  readonly totalClients = input.required<number>();
  readonly activeClients = input.required<number>();
}
