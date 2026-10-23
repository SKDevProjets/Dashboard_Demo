import { Component, input } from '@angular/core';
import { InvoiceStats } from '../../models/invoice.model';

@Component({
  imports: [],
  selector: 'app-stats-grid',
  styleUrl: './stats-grid.css',
  templateUrl: './stats-grid.html',
})
export class StatsGrid {
  stats = input.required<InvoiceStats>();
}
