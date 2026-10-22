import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Project } from '../models/project';
import { TeamService } from '../services/team.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectList } from '../components/project-list/project-list';
import { ProjectPagination } from '../components/project-pagination/project-pagination';

@Component({
  imports: [ProjectList, ProjectPagination],
  selector: 'app-team',
  styleUrl: './team.css',
  templateUrl: './team.html',
})
export class Team implements OnInit {
  private readonly teamService = inject(TeamService);
  private readonly destroyRef = inject(DestroyRef);

  readonly projects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly itemsPerPage = 5;
  readonly currentPage = signal(1);

  readonly totalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(this.projects().length / this.itemsPerPage)
    )
  );

  readonly paginatedProjects = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;

    return this.projects().slice(
      start,
      start + this.itemsPerPage
    );
  });

  readonly paginationStart = computed(() =>
    this.projects().length === 0
      ? 0
      : (this.currentPage() - 1) * this.itemsPerPage + 1
  );

  readonly paginationEnd = computed(() =>
    Math.min(
      this.currentPage() * this.itemsPerPage,
      this.projects().length
    )
  );

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.projects.set(response.data);
          this.currentPage.set(1);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load projects.');
          this.loading.set(false);
        },
      });
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}