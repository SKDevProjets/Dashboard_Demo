import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-clients-pagination',
  styleUrl: './clients-pagination.css',
  templateUrl: './clients-pagination.html',
})
export class ClientsPagination {
  readonly start = input.required<number>();
  readonly end = input.required<number>();
  readonly total = input.required<number>();
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();

  readonly previous = output<void>();
  readonly next = output<void>();
}
