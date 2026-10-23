import { Component, input } from '@angular/core';
import { ChartOptions, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { InvoiceStats } from '../../models/invoice.model';

@Component({
  imports: [BaseChartDirective],
  selector: 'app-invoice-charts',
  styleUrl: './invoice-charts.css',
  templateUrl: './invoice-charts.html',
})

export class InvoiceCharts {
  stats = input.required<InvoiceStats>();

  private readonly labels = ['Paid', 'Unpaid', 'Overdue'];
  private readonly colors = ['#16a34a', '#f59e0b', '#dc2626'];

  readonly doughnutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  readonly barOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  get doughnutData(): ChartData<'doughnut', number[], string> {
    return {
      labels: this.labels,
      datasets: [{
        data: [
          this.stats().paid,
          this.stats().unpaid,
          this.stats().overdue,
        ],
        backgroundColor: this.colors,
        hoverOffset: 8,
        borderWidth: 0,
      }],
    };
  }

  get barData(): ChartData<'bar', number[], string> {
    return {
      labels: this.labels,
      datasets: [{
        label: 'Number of invoices',
        data: [
          this.stats().paid,
          this.stats().unpaid,
          this.stats().overdue,
        ],
        backgroundColor: this.colors,
        borderRadius: 6,
        maxBarThickness: 55,
      }],
    };
  }
}
