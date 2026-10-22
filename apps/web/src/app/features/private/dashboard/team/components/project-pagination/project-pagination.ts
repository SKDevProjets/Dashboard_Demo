import { Component, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-project-pagination',
  styleUrl: './project-pagination.css',
  templateUrl: './project-pagination.html',
})
export class ProjectPagination {
  readonly currentPage = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly paginationStart = input.required<number>();
  readonly paginationEnd = input.required<number>();
  readonly totalItems = input.required<number>();

  readonly pageChange = output<number>();

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }
}
