import { Component, input } from '@angular/core';
import { InvoiceStats } from '../../models/invoice.model';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [DecimalPipe],
  selector: 'app-payment-progress',
  styleUrl: './payment-progress.css',
  templateUrl: './payment-progress.html',
})
export class PaymentProgress {
  stats = input.required<InvoiceStats>();

  get percentage(): number {
    const stats = this.stats();

    return stats.total > 0
      ? (stats.paid / stats.total) * 100
      : 0;
  }
}
