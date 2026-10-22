import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { calculateInvoiceStats } from '../services/invoice-stats.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [BaseChartDirective, DecimalPipe],
  selector: 'app-business',
  styleUrl: './business.css',
  templateUrl: './business.html',
})
export class Business implements OnInit {
  private readonly invoiceService = inject(InvoiceService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = true;
  error = false;

  stats = {
    paid: 0,
    unpaid: 0,
    overdue: 0,
    total: 0,
  };

  doughnutData: ChartData<'doughnut', number[], string> = {
    labels: ['Paid', 'Unpaid', 'Overdue'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#16a34a', '#f59e0b', '#dc2626'],
        hoverOffset: 8,
        borderWidth: 0,
      },
    ],
  };

  doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  barData: ChartData<'bar', number[], string> = {
    labels: ['Paid', 'Unpaid', 'Overdue'],
    datasets: [
      {
        label: 'Number of invoices',
        data: [0, 0, 0],
        backgroundColor: ['#16a34a', '#f59e0b', '#dc2626'],
        borderRadius: 6,
        maxBarThickness: 55,
      },
    ],
  };

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (invoices) => {
        this.stats = calculateInvoiceStats(invoices);

        const values = [
          this.stats.paid,
          this.stats.unpaid,
          this.stats.overdue,
        ];

        this.doughnutData = {
          ...this.doughnutData,
          datasets: [
            {
              ...this.doughnutData.datasets[0],
              data: [...values],
            },
          ],
        };

        this.barData = {
          ...this.barData,
          datasets: [
            {
              ...this.barData.datasets[0],
              data: [...values],
            },
          ],
        };

        console.log('Financial stats:', this.stats);
        console.log('Doughnut data:', this.doughnutData);
        console.log('Bar data:', this.barData);

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading invoices:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }
}