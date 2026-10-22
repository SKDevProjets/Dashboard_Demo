import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-dashboard-kpi',
  styleUrl: './dashboard-kpi.css',
  templateUrl: './dashboard-kpi.html',
})
export class DashboardKpi {
  readonly title = input.required<string>();
  readonly value = input.required<number | string>();
  readonly description = input.required<string>();
  readonly icon = input.required<string>();
  readonly tone = input<'clients' | 'active' | 'business' | 'team'>('clients');
  readonly loading = input(false);
  readonly badge = input<string | null>(null);
}
