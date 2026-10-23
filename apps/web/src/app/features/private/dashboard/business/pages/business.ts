import { ChangeDetectorRef, Component, inject, OnInit, } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { calculateInvoiceStats } from '../services/invoice-stats.service';
import { InvoiceCharts } from '../components/invoice-charts/invoice-charts';
import { PaymentProgress } from '../components/payment-progress/payment-progress';
import { StatsGrid } from '../components/stats-grid/stats-grid';
import { InvoiceStats } from '../models/invoice.model';

@Component({
  imports: [StatsGrid, InvoiceCharts, PaymentProgress],
  selector: 'app-business',
  styleUrl: './business.css',
  templateUrl: './business.html',
})
export class Business implements OnInit {
  private readonly invoiceService = inject(InvoiceService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = true;
  error = false;

  stats: InvoiceStats = {
    paid: 0,
    unpaid: 0,
    overdue: 0,
    total: 0,
  };

  ngOnInit(): void {
    this.invoiceService.getInvoicesProgressively().subscribe({
      next: (invoices) => {
        this.stats = calculateInvoiceStats(invoices);
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
        this.error = true;
        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

}